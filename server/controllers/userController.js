const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');

const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('_id name email createdAt updatedAt');
  res.json(users);
};

exports.getAuthUser = (req, res) => {
  if (!req.isAuthUser) {
    return res.status(400).json({
      message: 'You are unauthenticated. Please signin or signup'
    });
  }

  res.json(req.user);
};

exports.getUserById = async (req, res, next, id) => {
  console.log('@param userID', id);
  const user = await User.findOne({ _id: id });
  req.profile = user;

  console.log('__@profile_set');

  const profileId = mongoose.Types.ObjectId(req.profile._id);

  if (profileId.equals(req.user._id)) {
    console.log('@__EQUAL');
    req.isAuthUser = true;
    return next();
  }
  console.log('@__NOT_EQUAL');
  next();
};

exports.getUserProfile = (req, res) => {
  console.log('@__getUserProfile');
  if (!req.profile) {
    return res.status(400).json({
      message: 'User not found'
    });
  }

  res.json(req.profile);
};

exports.getUserFeed = async (req, res) => {
  const { following, _id } = req.profile;

  following.push(_id);
  const users = await User.find({ _id: { $nin: following } }).select(
    '_id name avatar'
  );

  res.json(users);
};

const avatarUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // storing image file upto 1MB
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(null, false);
    }
  }
};

exports.uploadAvatar = multer(avatarUploadOptions).single('avatar');

exports.resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.avatar = `/public/static/uploads/avatars/${
    req.user.name
  }-${Date.now()}.${extension}`;

  const image = await jimp.read(req.file.buffer);
  await image.resize(250, jimp.AUTO);
  await image.write(`./${req.body.avatar}`);
  next();
};

exports.updateUser = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!req.isAuthUser) {
    return res.status(400).json({
      message: 'You are not authorized to perform this action'
    });
  }
  const deletedUser = await User.findOneAndDelete({ _id: userId });
  res.json(deletedUser);
};

exports.addFollowing = async (req, res, next) => {
  const { followId } = req.body;

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { following: followId } }
  );
  next();
};

exports.addFollower = async (req, res) => {
  const { followId } = req.body;

  console.log({ followId, user: req.user._id });

  const user = await User.findOneAndUpdate(
    { _id: followId },
    { $push: { followers: req.user._id } },
    { new: true }
  );

  res.json(user);
};

exports.deleteFollowing = async (req, res, next) => {
  const { followId } = req.body;

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { following: followId } }
  );
  next();
};

exports.deleteFollower = async (req, res) => {
  const { followId } = req.body;

  console.log({ followId, user: req.user._id });

  const user = await User.findOneAndUpdate(
    { _id: followId },
    { $pull: { followers: req.user._id } },
    { new: true }
  );

  res.json(user);
};
