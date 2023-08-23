// // REFERENSI :
// //https://www.stackfive.io/work/prisma/seeding-relational-data-with-prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// import your seeder data here
const { todos } = require("../prisma/seeder");

const seederFunc = async () => {
  //register your func here
  await Promise.all(
    // add data with your seeder
    todos.map(async (todoSeed) => {
      await prisma.todo.create({
        data: {
          ...todoSeed,
        },
      });
    })
  );
};

seederFunc()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
