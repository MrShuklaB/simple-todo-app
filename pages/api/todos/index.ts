import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let todos = await prisma.todo.findMany({
      select: {
        id: true,
        text: true,
        isDone: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (todos.length === 0) {
      return res.status(404).json({});
    }
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    let { newTodo } = req.body;
    let createdTodoResourceId = await prisma.todo.create({
      data: {
        text: newTodo,
      },
      select: {
        id: true,
        text: true,
        isDone: true,
      },
    });
    if (!createdTodoResourceId.id) {
      return res
        .status(500)
        .json({ message: "Could not write to database. Please try again." });
    }
    return res
      .status(201)
      .setHeader("Location", `/api/todos/${createdTodoResourceId.id}`)
      .json(createdTodoResourceId);
  }
}
