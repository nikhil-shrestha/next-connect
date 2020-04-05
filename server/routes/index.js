const express = require('express');
const {
  userValidationRules,
  validate,
  checkAuth,
  signup,
  signin,
  signout
} = require('../controllers/authController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

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
router.param('/api/userId', userController.getUserById);

router
  .route('/api/users/:userId')
  .get(userController.getAuthUser)
  .put(
    checkAuth,
    userController.uploadAvatar,
    catchErrors(userController.resizeAvatar),
    catchErrors(userController.updateUser)
  )
  .delete(checkAuth, catchErrors(userController.deleteUser));

router.get('/api/users', userController.getUsers);
router.get(
  '/api/users/profile/:userId',
  catchErrors(userController.getUserProfile)
);
router.get(
  '/api/users/feed/:userId',
  checkAuth,
  catchErrors(userController.getUserFeed)
);

router.put(
  '/api/users/follow',
  checkAuth,
  catchErrors(userController.addFollowing),
  catchErrors(userController.addFollower)
);
router.put(
  '/api/users/unfollow',
  checkAuth,
  catchErrors(userController.deleteFollowing),
  catchErrors(userController.deleteFollower)
);

/**
 * POST ROUTES: /api/posts
 */
router.param('/api/postId', postController.getPostById);

router.put(
  '/api/posts/like',
  checkAuth,
  catchErrors(postController.toggleLike)
);
router.put(
  '/api/posts/unlike',
  checkAuth,
  catchErrors(postController.toggleLike)
);

router.put(
  '/api/posts/comment',
  checkAuth,
  catchErrors(postController.toggleComment)
);
router.put(
  '/api/posts/uncomment',
  checkAuth,
  catchErrors(postController.toggleComment)
);

router.delete(
  '/api/posts/:postId',
  checkAuth,
  catchErrors(postController.deletePost)
);

router.post(
  '/api/posts/new/:userId',
  checkAuth,
  postController.uploadImage,
  catchErrors(postController.resizeImage),
  catchErrors(postController.addPost)
);
router.get('/api/posts/by/:userId', catchErrors(postController.getPostsByUser));
router.get('/api/posts/feed/:userId', catchErrors(postController.getPostFeed));

module.exports = router;
