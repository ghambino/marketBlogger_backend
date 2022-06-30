const bloglistRouter = require("express").Router();
const Bloglist = require("../models/blogpost");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

bloglistRouter.get("/", async (request, response, next) => {
  try {
    let returnedlist = await Bloglist.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(returnedlist);
  } catch (error) {
    next(error);
  }
});

bloglistRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = request.token;

  //user verification
  const verifiedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !verifiedToken.id) {
    response
      .status(401)
      .json({ error: "user not recognised...pls try login again" });
  }

  const blogCreator = await User.findById(verifiedToken.id);
  //blogpost creation
  const bloglist = new Bloglist({
    title: body.title,
    bodyText: body.bodyText,
    timeframe: new Date(),
    likes: 0,
    comment: [],
    user: blogCreator.id,
  });
  try {
    let savedlist = await bloglist.save();
    blogCreator.blogpost = blogCreator.blogpost.concat(savedlist.id);
    await blogCreator.save();

    response.json(savedlist);
  } catch (error) {
    next(error);
  }
});

bloglistRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Bloglist.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

bloglistRouter.delete("/:id", async (request, response, next) => {
  const { token, params } = request;
  const verifiedToken = jwt.verify(token, process.env.SECRET);
  console.log(verifiedToken.id);

  if (!token || !verifiedToken.id) {
    response.status(401).json({ error: "unauthorized" });
  }

  const blog = await Bloglist.findById(params.id);
  console.log(blog);

  const belongtoUser = blog.user.toString() === verifiedToken.id.toString();

  if (belongtoUser) {
    try {
      await Bloglist.findByIdAndDelete(params.id);
      response.status(204).send("deleted");
    } catch (error) {
      next(error);
    }
  } else {
    response.json({ error: "not validated to delete the resource" });
  }
});

bloglistRouter.put("/:id", async (request, response, next) => {
  const { body, token } = request;
  const id = request.params.id;
  const verifiedToken = jwt.verify(token, process.env.SECRET);

  const blog = await Bloglist.findById(id);

  if (!blog) return response.status(404).end();

  const newUpdate = {
    title: body.title ? body.title : blog.title,
    bodyText: body.bodyText ? body.bodyText : blog.bodyText,
    timeframe: body.timeframe ? body.timeframe : blog.timeframe,
    likes: body.likes ? blog.likes + 1 : blog.likes,
    comment: body.comment
      ? [
          ...blog.comment,
          {
            content: body.comment,
            timeframe: new Date(),
            likes: 0,
          },
        ]
      : blog.comment,
  };

  try {
    const newBlog = await Bloglist.findByIdAndUpdate(id, newUpdate);
    response.json(newBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = bloglistRouter;
