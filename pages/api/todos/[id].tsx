import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let requestMethod = req.method?.toLocaleUpperCase();
  let id = req.query.id as string;

  if (requestMethod === "PUT") {
    let todoToUpdate = await prisma.todo.findUnique({
      where: { id },
      select: { isDone: true },
    });
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isDone: !todoToUpdate?.isDone,
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
