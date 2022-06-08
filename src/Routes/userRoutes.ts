import express from "express";
import { User } from "../Entities/user";

const userRouter = express.Router();

userRouter.post("/:userId", async function (req, res) { 
  //creating user
  const { userId } = req.params;

  const user = await User.findOneBy({ id: +userId });

  if (user) {
    return res.status(404).json({ msg: "User already exists" });
  }

  const { firstName, lastName } = req.body;

  const newUser = User.create({
    firstName,
    lastName,
  });

  await newUser.save();

  return res.json(newUser);
});


export default userRouter;

