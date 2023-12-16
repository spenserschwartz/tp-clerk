import { PrismaClient } from "@prisma/client";

// const data = [
//   {
//     name: "The Rebuilt Reichstag",
//     imageURL:
//       "https://images.unsplash.com/photo-1651947149260-e896cecc5ac3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "The historic Reichstag, originally completed in 1894, now serves as the home of the German Parliament.",
//   },
//   {
//     name: "Museum Island",
//     imageURL:
//       "https://images.unsplash.com/photo-1667935094995-58756c4fc0f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "A UNESCO World Heritage Site, Museum Island is an ensemble of significant museums in Berlin.",
//   },

//   {
//     name: "German Historical Museum",
//     imageURL:
//       "https://images.unsplash.com/photo-1641531197157-56e9d75342c9?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "A must-visit for insights into Berlin's rich history, established to mark the city's 750th anniversary.",
//   },
//   {
//     name: "Berliner Fernsehturm",
//     imageURL:
//       "https://images.unsplash.com/photo-1668844421778-3d59a944921b?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "Berlin's Television Tower, a symbol of the city, offers spectacular views over the capital.",
//   },
//   {
//     name: "Mauer Museum (Checkpoint Charlie Museum)",
//     imageURL:
//       "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "This museum highlights the history of the Berlin Wall and human rights at the famous Checkpoint Charlie.",
//   },
//   {
//     name: "Charlottenburg Palace and Park",
//     imageURL:
//       "https://images.unsplash.com/photo-1586804257780-6874ce8151f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "Berlin's largest Prussian estate, once the primary residence of German royalty.",
//   },
//   {
//     name: "Gendarmenmarkt",
//     imageURL:
//       "https://images.unsplash.com/photo-1582395148362-ce7c64228068?q=80&w=2017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "A prominent square in Berlin, surrounded by historic buildings including the Konzerthaus and two cathedrals.",
//   },
//   {
//     name: "Jewish Museum Berlin",
//     imageURL:
//       "https://images.unsplash.com/photo-1664883908473-ef57dc0e21a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     authorId: "createMany",
//     cityId: "cllgzrb4n00001e4bdkolk49o",
//     description:
//       "An architecturally striking museum showcasing the history and culture of Jewish Germans.",
//   },
// ];

const data = [
  {
    name: "The Houses of Parliament",
    imageURL:
      "https://images.unsplash.com/photo-1610026378085-15d0e8f685db?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "The heart of British politics and the iconic Big Ben clock tower.",
  },

  {
    name: "The Shard",
    imageURL:
      "https://images.unsplash.com/photo-1693406760979-2e4a13b189ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    authorId: "createMany",

    description:
      "A 95-story skyscraper which offers breathtaking views over London.",
  },
  {
    name: "The Natural History Museum",
    imageURL:
      "https://images.unsplash.com/photo-1584652868574-0669f4292976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "A museum exhibiting a vast range of specimens from various segments of natural history.",
  },
  {
    name: "The National Gallery",
    imageURL:
      "https://images.unsplash.com/photo-1668860707676-7b5ecd1dcb62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "An art museum in Trafalgar Square in the City of Westminster, Central London, founded in 1824.",
  },
  {
    name: "The Tate Modern",
    imageURL:
      "https://images.unsplash.com/photo-1508596177889-22c90e7f9a96?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "Britain's national gallery of international modern art and forms part of the Tate group.",
  },
  {
    name: "Westminster Abbey",
    imageURL:
      "https://images.unsplash.com/photo-1588166726608-820f753169a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "A large, mainly Gothic abbey church in the City of Westminster, London, just to the west of the Palace of Westminster.",
  },
  {
    name: "The Royal Observatory, Greenwich",
    imageURL:
      "https://images.unsplash.com/photo-1642582466531-92118d16f5df?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "An observatory situated on a hill in Greenwich Park, overlooking the River Thames.",
  },
  {
    name: "St. Paul's Cathedral",
    imageURL:
      "https://images.unsplash.com/photo-1578012702498-27e3d40c8701?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "An Anglican cathedral, the seat of the Bishop of London and the mother church of the Diocese of London.",
  },
  {
    name: "Camden Market",
    imageURL:
      "https://images.unsplash.com/photo-1561566302-67abce51c2c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "A diverse community of creative sellers, street food traders, and independent stores next to the Regent's Canal.",
  },
  {
    name: "The Regent's Park",
    imageURL:
      "https://images.unsplash.com/photo-1557868363-e58c250144cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "One of London's Royal Parks, it contains Regent’s University and the London Zoo.",
  },
  {
    name: "Covent Garden",
    imageURL:
      "https://images.unsplash.com/photo-1606726826514-0386bbb05b5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "Known for its street performers, diverse array of shops, restaurants, bars, and a bustling market selling everything from antiques to clothing.",
  },
  {
    name: "The Globe Theatre",
    imageURL:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorId: "createMany",
    cityId: "cll5m4ihx0000z4mruvrk2hi4",
    description:
      "A reconstruction of the Globe Theatre, an Elizabethan playhouse associated with William Shakespeare, situated on the south bank of the River",
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
