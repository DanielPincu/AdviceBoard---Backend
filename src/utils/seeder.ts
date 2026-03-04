import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";
import { faker } from "@faker-js/faker";

// Project imports
import { userModel } from "../models/user.model";
import { adviceModel } from "../models/advice.model";
import { connect, disconnect } from "../driver/mongo.driver";

dotenvFlow.config();


 //Seed the database with Advice Board data

export async function seed() {
  try {
    await connect();

    await deleteAllData();
    await seedData();

    console.log("Advice Board seeding completed successfully...");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding Advice Board data:", err);
    process.exit(1);
  } finally {
    await disconnect();
  }
}


 // Delete all data from the database
 
export async function deleteAllData() {
  await adviceModel.deleteMany({});
  await userModel.deleteMany({});

  console.log("Cleared Advice Board data successfully...");
}


 //Seed users, advices and replies
 
export async function seedData() {
  // Hash a default password for all users
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  // Create users
  const users = [];

  for (let i = 0; i < 3; i++) {
    const user = await new userModel({
      username: faker.internet.username(),
      email: faker.internet.email().toLowerCase(),
      password: passwordHash,
    }).save();

    users.push(user);
  }

  // Create advices
  const advices = [];

  for (let i = 0; i < 10; i++) {
    const author = faker.helpers.arrayElement(users);

    const advice = await new adviceModel({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
      _createdBy: author._id,
      anonymous: faker.datatype.boolean(),
    }).save();

    advices.push(advice);
  }

  // Create embedded replies
  for (const advice of advices) {
    const numberOfReplies = faker.number.int({ min: 0, max: 5 });

    const replies: any[] = [];

    for (let i = 0; i < numberOfReplies; i++) {
      const author = faker.helpers.arrayElement(users);

      replies.push({
        content: faker.lorem.sentences(2),
        anonymous: faker.datatype.boolean(),
        _createdBy: author._id,
      });
    }

    advice.replies = replies as any;
    await advice.save();
  }

  console.log("Seeded Advice Board data successfully...");
}

// Start seeding
seed();