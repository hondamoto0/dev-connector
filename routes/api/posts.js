const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    GET api/posts
// @desc     Test route
// @access   public
router.post(
  "/",
  [auth, [check("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    return res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorized" });
    } else {
      post.remove();
      return res.json({ msg: "Post removed" });
    }
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    console.log(error.message);
    return res.status(500).send({ msg: "Server Error" });
  }
});

// @route    GET api/posts
// @desc     Test route
// @access   public

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    } else {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res.status(400).json({
          msg: "Post already liked"
        });
      }
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route    GET api/posts
// @desc     Test route
// @access   public

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        msg: "Post has not been liked yet"
      });
    } else {
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user.id
      );
      await post.save();
      return res.json(post.likes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/comment/:id
// @desc     Comment on a post
// @access   Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        return res.json(post.comments);
      } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
    }
  }
);

// @route    GET api/posts/comment/:id/:comment_id
// @desc     Comment on a post
// @access   Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    console.log(req.params.comment_id);
    console.log(req.params.id);
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User not authorized" });
    }
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    return res.json(post.comments);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
