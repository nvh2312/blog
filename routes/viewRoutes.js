const express = require("express");
const Blog = require("../models/blogModel");
const authController = require("../controllers/authController");
// const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", async function (req, res, next) {
  const page = req.query.page || 1;
  const perPage = 6;
  const quantity = await Blog.countDocuments();
  const blog = await Blog.find()
    .sort({ timeCreated: "desc" })
    .skip((page - 1) * perPage)
    .limit(perPage);
  return res.render("home", {
    blog,
    current: page,
    pages: Math.ceil(quantity / perPage),
  });
});
router.get("/add", async function (req, res, next) {
  res.render("addBlog");
});
router.get("/blog", async function (req, res, next) {
  res.render("blog");
});
router.get("/user", async function (req, res, next) {
  res.render("user");
});

router.get("/search/:searchStr", async function (req, res, next) {
  const searchStr = req.params.searchStr;
  const page = req.query.page || 1;
  const quantity = await Blog.countDocuments({ $text: { $search: searchStr } });
  const perPage = 6;
  const blog = await Blog.find({ $text: { $search: searchStr } })
    .sort({ timeCreated: "desc" })
    .skip((page - 1) * perPage)
    .limit(perPage);
  console.log(blog);
  return res.render("home", {
    blog,
    current: page,
    pages: Math.ceil(quantity / perPage),
  });
});

router.get("/:id", async function (req, res, next) {
  const blog = await Blog.find({ slug: req.params.id });
  res.render("showBlog", { blog });
});

module.exports = router;
