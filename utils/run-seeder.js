const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { users, kelas, materi } = require("../prisma/seeder");

const seedUsers = async () => {
  // Cek apakah sudah ada data di tabel user
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length === 0) {
    // Jika tidak ada data, jalankan seeder
    await Promise.all(
      users.map(async (userSeed) => {
        await prisma.user.create({
          data: {
            ...userSeed,
          },
        });
      })
    );
    console.log("Seeded users successfully.");
  } else {
    console.log("Data users sudah ada, tidak perlu seeding.");
  }
};

const seedKelas = async () => {
  // Cek apakah sudah ada data di tabel kelas
  const existingKelas = await prisma.kelas.findMany();
  if (existingKelas.length === 0) {
    // Jika tidak ada data, jalankan seeder
    await Promise.all(
      kelas.map(async (kelasSeed) => {
        await prisma.kelas.create({
          data: {
            ...kelasSeed,
          },
        });
      })
    );
    console.log("Seeded kelas successfully.");
  } else {
    console.log("Data kelas sudah ada, tidak perlu seeding.");
  }
};

const seedMateri = async () => {
  // Cek apakah sudah ada data di tabel materi
  const existingMateri = await prisma.materi.findMany();
  if (existingMateri.length === 0) {
    // Jika tidak ada data, jalankan seeder
    await Promise.all(
      materi.map(async (materiSeed) => {
        const kelasRecord = await prisma.kelas.findFirst({
          where: {
            name: materiSeed.name.includes("JavaScript") ? "JavaScript" : "PHP",
          },
        });

        if (kelasRecord) {
          await prisma.materi.create({
            data: {
              ...materiSeed,
              kelas: {
                connect: {
                  id: kelasRecord.id,
                },
              },
            },
          });
        } else {
          console.error(
            `Kelas tidak ditemukan untuk materi: ${materiSeed.name}`
          );
        }
      })
    );
    console.log("Seeded materi successfully.");
  } else {
    console.log("Data materi sudah ada, tidak perlu seeding.");
  }
};

const seedDatabase = async () => {
  try {
    await seedUsers();
    await seedKelas();
    await seedMateri();
    console.log("Successfully seeded database.");
  } catch (error) {
    console.error(`There was an error while seeding: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
