const express = require('express');
const {
  userValidationRules,
  validate,
  checkAuth,
  signup,
  signin,
  signout
} = require('../controllers/authController');
const {
  getUsers,
  getUserById,
  getAuthUser,
  getUserProfile,
  deleteUser,
  getUserFeed,
  addFollowing,
  addFollower,
  deleteFollowing,
  deleteFollower,
  uploadAvatar,
  resizeAvatar,
  updateUser
} = require('../controllers/userController');
const {
  getPostById,
  toggleLike,
  toggleComment,
  deletePost,
  uploadImage,
  resizeImage,
  addPost,
  getPostsByUser,
  getPostFeed
} = require('../controllers/postController');

const router = express.Router();

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * AUTH ROUTES: /api/auth
 */
router.post(
  '/api/auth/signup',
  userValidationRules(),
  validate,
  catchErrors(signup)
);
router.post('/api/auth/signin', signin);
router.get('/api/auth/signout', signout);

/**
 * USER ROUTES: /api/users
 */
router.param('userId', getUserById);

router.put(
  '/api/users/follow',
  checkAuth,
  catchErrors(addFollowing),
  catchErrors(addFollower)
);

router.put(
  '/api/users/unfollow',
  checkAuth,
  catchErrors(deleteFollowing),
  catchErrors(deleteFollower)
);

router
  .route('/api/users/:userId')
  .get(getAuthUser)
  .put(
    checkAuth,
    uploadAvatar,
    catchErrors(resizeAvatar),
    catchErrors(updateUser)
  )
  .delete(checkAuth, catchErrors(deleteUser));

router.get('/api/users', getUsers);
router.get('/api/users/profile/:userId', getUserProfile);
router.get('/api/users/feed/:userId', checkAuth, catchErrors(getUserFeed));

/**
 * POST ROUTES: /api/posts
 */
router.param('postId', getPostById);

router.put('/api/posts/like', checkAuth, catchErrors(toggleLike));
router.put('/api/posts/unlike', checkAuth, catchErrors(toggleLike));

router.put('/api/posts/comment', checkAuth, catchErrors(toggleComment));
router.put('/api/posts/uncomment', checkAuth, catchErrors(toggleComment));

router.delete('/api/posts/:postId', checkAuth, catchErrors(deletePost));

router.post(
  '/api/posts/new/:userId',
  checkAuth,
  uploadImage,
  catchErrors(resizeImage),
  catchErrors(addPost)
);
router.get('/api/posts/by/:userId', catchErrors(getPostsByUser));
router.get('/api/posts/feed/:userId', catchErrors(getPostFeed));

module.exports = router;
