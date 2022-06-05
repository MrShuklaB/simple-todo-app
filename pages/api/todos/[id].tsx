import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let requestMethod = req.method?.toLocaleUpperCase();
  let id = req.query.id as string;
  let { text, isDone } = req.body as { text: string; isDone: boolean };

  if (requestMethod === "PUT") {
    let todoToUpdate = await prisma.todo.findUnique({
      where: { id },
      select: { isDone: true, text: true, id: true },
    });

    if (!todoToUpdate?.id) {
      return res.status(404).json({});
    }
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
        isDone,
      },
    });

    return res.status(200).json({});
  }

  if (requestMethod === "DELETE") {
    await prisma.todo.delete({
      where: { id },
    });
    return res.status(200).json({});
  }
}
