import { prisma } from "utils/db";

async function seed() {
  await prisma.todo.create({
    data: {
      text: "Finish demo project",
    },
  });

  await prisma.todo.create({
    data: {
      text: "Integrate SQLite with app",
      isDone: true,
    },
  });
}

seed()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
