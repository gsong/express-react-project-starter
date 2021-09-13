import express from "express";

let userList = [
  { id: 1, name: "Xiao", email: "xiao@email.com" },
  { id: 2, name: "Natalie", email: "natalie@email.com" },
  { id: 3, name: "Tabitha", email: "tabitha@email.com" },
];

let idSequence = 3;

const userRouter = express.Router();

userRouter.get("/", (request, response) => response.json(userList));

userRouter.use(express.json());
userRouter.post("/", (request, response) => {
  const newUser = { ...request.body, id: (idSequence += 1) };
  userList = [...userList, newUser];
  return response.json(newUser);
});

export default userRouter;
