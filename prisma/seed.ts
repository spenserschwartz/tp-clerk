import { PrismaClient } from "@prisma/client";

const data = [
  {
    name: "The Rebuilt Reichstag",
    imageURL:
      "https://images.unsplash.com/photo-1651947149260-e896cecc5ac3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "The historic Reichstag, originally completed in 1894, now serves as the home of the German Parliament.",
  },
  {
    name: "Museum Island",
    imageURL:
      "https://images.unsplash.com/photo-1667935094995-58756c4fc0f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "A UNESCO World Heritage Site, Museum Island is an ensemble of significant museums in Berlin.",
  },

  {
    name: "German Historical Museum",
    imageURL:
      "https://images.unsplash.com/photo-1641531197157-56e9d75342c9?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "A must-visit for insights into Berlin's rich history, established to mark the city's 750th anniversary.",
  },
  {
    name: "Berliner Fernsehturm",
    imageURL:
      "https://images.unsplash.com/photo-1668844421778-3d59a944921b?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "Berlin's Television Tower, a symbol of the city, offers spectacular views over the capital.",
  },
  {
    name: "Mauer Museum (Checkpoint Charlie Museum)",
    imageURL:
      "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "This museum highlights the history of the Berlin Wall and human rights at the famous Checkpoint Charlie.",
  },
  {
    name: "Charlottenburg Palace and Park",
    imageURL:
      "https://images.unsplash.com/photo-1586804257780-6874ce8151f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "Berlin's largest Prussian estate, once the primary residence of German royalty.",
  },
  {
    name: "Gendarmenmarkt",
    imageURL:
      "https://images.unsplash.com/photo-1582395148362-ce7c64228068?q=80&w=2017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "A prominent square in Berlin, surrounded by historic buildings including the Konzerthaus and two cathedrals.",
  },
  {
    name: "Jewish Museum Berlin",
    imageURL:
      "https://images.unsplash.com/photo-1664883908473-ef57dc0e21a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cllgzrb4n00001e4bdkolk49o",
    description:
      "An architecturally striking museum showcasing the history and culture of Jewish Germans.",
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
