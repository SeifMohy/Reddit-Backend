import express from "express";
import { Post } from "../Entities/post";
import { User } from "../Entities/user";
import { Comment } from "../Entities/comment";
import { AppDataSource } from "../Routes/data-source";
import { Tag } from "../Entities/tag";
import { In } from "typeorm";

const postRouter = express.Router();

postRouter.get("/:postId", async function (req, res) {
  //returning post with post id
  const { postId } = req.params;

  const post = await Post.find({
    where: { id: +postId },
    relations: { comments: {user: true}, user: true },
  });

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }
  return res.json(post);
});

postRouter.get("/users/:userId", async function (req, res) {
  //returning posts with user id
  const { userId } = req.params;

  const user = await User.findOneBy({ id: +userId });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const posts = await Post.find({
    where: { user: { id: +userId } },
    relations: { user: true, comments: true },
  });

  return res.json(posts);
});

postRouter.post("/:userId", async function (req, res) {
  //creating post
  try {
    const { userId } = req.params;

    const user = await User.findOneBy({ id: +userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { title, body, tags } = req.body;

    const tagsToSave = await Tag.find({ where: { id: In(tags) } });

    // const tagsToSave: Tag[] = [];

    // for (let i = 0; i < tags.length; i++) {
    //   const tag = await Tag.findOneBy({ id: tags[i] });
    //   if (tag) tagsToSave.push(tag);
    // }

    const post = Post.create({
      title,
      body,
      user,
      tags: tagsToSave,
    });

    await post.save();

    return res.json(post);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

postRouter.get("/comments/:postId", async function (req, res) {
  //getting comments and post with post id
  const { postId } = req.params;

  const post = await Post.findOneBy({ id: +postId });

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  const comments = await Comment.find({
    where: { post: { id: +postId } },
    relations: { post: true, user: true },
  });

  return res.json(comments);
});

postRouter.post("/comment/:userId/:postId", async function (req, res) {
  //adding comment on post
  const { userId } = req.params;
  const { postId } = req.params;

  const user = await User.findOneBy({ id: +userId });
  const post = await Post.findOneBy({ id: +postId });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  const { title, comment } = req.body;

  const newComment = Comment.create({
    title,
    comment,
    user,
    post,
  });

  //   let allowed = true;
  //   const allowedFields: (keyof Post)[] = ['title','body']

  //   Object.keys(req.body).map((x)=>{
  //     if(!allowedFields.includes(x as keyof Post))
  //       allowed = false
  //   })

  //   if(!allowed){
  //     res.send("not allow")
  //   }
  //  await Post.save({
  //     ...post,
  //     ...req.body
  //   })

  await newComment.save();

  return res.json(newComment);
});

postRouter.post("/update/:postId/:userId", async function (req, res) {
  //updating post
  const { userId } = req.params;
  const { postId } = req.params;

  const user = await User.findOneBy({ id: +userId });
  const post = await Post.findOneBy({ id: +postId });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  let allowed = true;
  const allowedFields: (keyof Post)[] = ["title", "body"];

  Object.keys(req.body).map((x) => {
    if (!allowedFields.includes(x as keyof Post)) allowed = false;
  });

  if (!allowed) {
    res.send("not allow");
  }
  const update = await Post.save({
    ...post,
    ...req.body,
  });

  return res.json(update);
});

postRouter.delete("/delete/:postId", async function (req, res) {
  //deleting post
  const { postId } = req.params;

  const post = await Post.findOneBy({ id: +postId });

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  await Post.remove(post);
  const posts = await Post.find();
  return res.json(posts);
});

postRouter.post("/tag/:tagId", async function (req, res) {
  //adding a tag on post

  const { tagId } = req.params;

  const tag = await Tag.findOneBy({ id: +tagId });

  if (tag) {
    return res.status(404).json({ msg: "Tag already exists" });
  }
  const { tagName } = req.body;

  const newTag = Tag.create({
    tagName,
  });
  await newTag.save();
  return res.json(newTag);
});

export default postRouter;

// const postRepository = AppDataSource.getRepository(Post);

// const newPost = new Post();
// newPost.title = "hii";
// newPost.firstName = "seif";
// newPost.lastName = "elmoo";
// newPost.body = "first one sasf yaaawwww"
// await postRepository.save(newPost);
