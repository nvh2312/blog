const express = require("express");
const factory = require("./../controllers/handlerFactory");
const blogController = require("./../controllers/blogController");

// const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(factory.uploadImage, factory.getImage, blogController.createBlog);
router.route("/table").get(blogController.getTable);
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
