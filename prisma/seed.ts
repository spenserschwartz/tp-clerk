import { PrismaClient } from "@prisma/client";

const data = [
  {
    name: "Berlin Cathedral",
    imageURL: "https://unsplash.com/photos/_3Q3tsJ01nc",
    authorId: "createMany",
  },
  {
    name: "East Side Gallery",
    imageURL: "https://unsplash.com/photos/120xh4H-fHg",
    authorId: "createMany",
  },
  {
    name: "Checkpoint Charlie",
    imageURL: "https://unsplash.com/photos/FwF_fKj5tBo",
    authorId: "createMany",
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.attraction.createMany({ data });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

/* 
    https://www.prisma.io/docs/guides/migrate/seed-database
    https://www.youtube.com/watch?v=QxyqR4yh1GI

    npx prisma db seed
*/
