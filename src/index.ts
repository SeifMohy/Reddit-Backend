import express from "express";
import { config } from "dotenv";
import { Request, Response, json, urlencoded } from "express";
import postRouter from "./Routes/postRoutes";
import userRouter from "./Routes/userRoutes";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { AppDataSource } from "./Routes/data-source";
import {Post} from "./Entities/post"

config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json()); //express
app.use(urlencoded({ extended: false })); //express

app.get("/", async function (req: Request, res: Response) {
  const posts = await Post.find({relations: {user: true, tags: true, comments: {user: true}, likes: true}})
  if (!posts){
    res.json("no posts")
  }
  return res.json(posts);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || 4545, async () => {
  console.log(`running on port ${process.env.PORT}`);
  await AppDataSource.initialize();
  console.log("Connected to DB")
});