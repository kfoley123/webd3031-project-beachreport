import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashedpassword123", // Replace with hashed password
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "hashedpassword456",
    },
  });

  // Create Nova Scotia Beaches
  const beach1 = await prisma.beach.create({
    data: {
      slug: "lawrencetown-beach",
      name: "Lawrencetown Beach",
      location: "Lawrencetown, NS",
      description: "A popular surfing destination with stunning ocean views.",
      imageUrl: "https://example.com/lawrencetown.jpg",
    },
  });

  const beach2 = await prisma.beach.create({
    data: {
      slug: "carters-beach",
      name: "Carter's Beach",
      location: "Port Mouton, NS",
      description: "White sand and turquoise waters, often compared to the Caribbean.",
      imageUrl: "https://example.com/carters.jpg",
    },
  });

  const beach3 = await prisma.beach.create({
    data: {
      slug: "ingonish-beach",
      name: "Ingonish Beach",
      location: "Cape Breton, NS",
      description: "A mix of saltwater and freshwater swimming options with scenic views.",
      imageUrl: "https://example.com/ingonish.jpg",
    },
  });

  // Add Beach Reports
  await prisma.report.createMany({
    data: [
      {
        beachId: beach1.id,
        user: user1.name!,
        reportText: "Great waves today! Perfect for surfing.",
        rating: 5,
      },
      {
        beachId: beach2.id,
        user: user2.name!,
        reportText: "The water was crystal clear and warm.",
        rating: 4,
      },
      {
        beachId: beach3.id,
        user: user1.name!,
        reportText: "Beautiful views but the water was a bit cold.",
        rating: 3,
      },
    ],
  });

  console.log("Dummy data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
