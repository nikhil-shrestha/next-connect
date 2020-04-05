const mongoose = require('mongoose');

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

exports.getUserFeed = () => {};

exports.uploadAvatar = () => {};

exports.resizeAvatar = () => {};

exports.updateUser = () => {};

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

exports.deleteFollowing = () => {};

exports.deleteFollower = () => {};
