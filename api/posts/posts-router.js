// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    if (!post) {
      throw new Error("Ouch! post not found.");
    }
    res.status(200).json(post);
  } catch (err) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    }
    const createPost = await Posts.insert(req.body);
    const { id } = createPost;
    const newPost = await Posts.findById(id);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { title, contents } = req.body;
    const post = await Posts.findById(id);

    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
      console.log(res.body);
    } else {
      await Posts.update(id, req.body);
      const updatedPost = await Posts.findById(id);
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
    await Posts.remove(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
    const comments = await Posts.findPostComments(id);
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
