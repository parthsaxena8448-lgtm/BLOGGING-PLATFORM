const express = require("express");

const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all posts - public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
});

// GET current user's posts - protected
router.get("/my-posts", protect, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user.id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch your posts",
    });
  }
});

// GET one post - public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch post",
    });
  }
});

// CREATE post - protected
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const populatedPost = await post.populate(
      "author",
      "name email"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
});

// UPDATE post - protected
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your own posts",
      });
    }

    if (title !== undefined) {
      post.title = title;
    }

    if (content !== undefined) {
      post.content = content;
    }

    await post.save();

    const updatedPost = await post.populate(
      "author",
      "name email"
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update post",
    });
  }
});

// DELETE post - protected
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own posts",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete post",
    });
  }
});

module.exports = router;