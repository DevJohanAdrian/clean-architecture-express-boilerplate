import prisma from "./prisma.connection";
// import { encryptPassword } from '../utils/bcrypt/encrypt.js';

class Seed {
  user: { name: string; email: string; password: string };

  constructor() {
    this.user = {
      name: "admin",
      email: "admin@gmail.com",
      password: "123456",
    };
  }
  async create(createObject: any) {
    // createObject.password = await encryptPassword(createObject.password);
    const createdItem = await prisma.users.create({
      data: createObject,
    });
    return createdItem;
  }

  async main() {
    await this.create(this.user);
  }
}

// Ejecutar la clase Seeder
const seeder = new Seed();

seeder
  .main()
  .then(() => {
    console.log("Prisma seeders completed");
    // await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e, "An error occurred while performing prisma seeders.");
    // await prisma.$disconnect();
    process.exit(1);
  });
