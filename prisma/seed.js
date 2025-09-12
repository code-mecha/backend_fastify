import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function autoMigrateAndSeed() {
  try {
    // Prisma handles migrations separately, so we'll just focus on seeding
    
    // Seed planets if table is empty
    const planetCount = await prisma.planet.count()
    if (planetCount === 0) {
      const planets = [
        {
          id: 1,
          name: "Tatooine",
          population: 200000n,
          diameter: 10465,
          rotation_period: 23,
          orbital_period: 304,
        },
        {
          id: 2,
          name: "Alderaan",
          population: 2000000000n,
          diameter: 12500,
          rotation_period: 24,
          orbital_period: 364,
        },
        {
          id: 3,
          name: "Kashyyyk",
          population: 45000000n,
          diameter: 12765,
          rotation_period: 26,
          orbital_period: 381,
        },
        {
          id: 4,
          name: "Coruscant",
          population: 1000000000000n,
          diameter: 12240,
          rotation_period: 24,
          orbital_period: 368,
        },
        {
          id: 5,
          name: "Naboo",
          population: 4500000000n,
          diameter: 12120,
          rotation_period: 26,
          orbital_period: 312,
        },
      ]
      
      await prisma.planet.createMany({
        data: planets
      })
      console.log('Planets seeded successfully')
    } else {
      console.log('Planets table already has data, skipping seed')
    }

    // Seed people if table is empty
    const peopleCount = await prisma.people.count()
    if (peopleCount === 0) {
      const people = [
        {
          id: 1,
          name: "Luke Skywalker",
          gender: "male",
          height: 172,
          mass: 77.0,
          hair_color: "blond",
          planet_id: 1,
          url: "https://swapi.dev/api/people/1/",
        },
        {
          id: 2,
          name: "Leia Organa",
          gender: "female",
          height: 150,
          mass: 49.0,
          hair_color: "brown",
          planet_id: 2,
          url: "https://swapi.dev/api/people/2/",
        },
        {
          id: 3,
          name: "Han Solo",
          gender: "male",
          height: 180,
          mass: 80.0,
          hair_color: "brown",
          planet_id: 1,
          url: "https://swapi.dev/api/people/3/",
        },
        {
          id: 4,
          name: "Chewbacca",
          gender: "male",
          height: 228,
          mass: 112.0,
          hair_color: "brown",
          planet_id: 3,
          url: "https://swapi.dev/api/people/4/",
        },
        {
          id: 5,
          name: "Anakin Skywalker",
          gender: "male",
          height: 188,
          mass: 84.0,
          hair_color: "blond",
          planet_id: 1,
          url: "https://swapi.dev/api/people/5/",
        },
        {
          id: 6,
          name: "Padmé Amidala",
          gender: "female",
          height: 165,
          mass: 45.0,
          hair_color: "brown",
          planet_id: 5,
          url: "https://swapi.dev/api/people/6/",
        },
        {
          id: 7,
          name: "Mace Windu",
          gender: "male",
          height: 188,
          mass: 84.0,
          hair_color: "none",
          planet_id: 4,
          url: "https://swapi.dev/api/people/7/",
        },
      ]
      
      await prisma.people.createMany({
        data: people
      })
      console.log('People seeded successfully')
    } else {
      console.log('People table already has data, skipping seed')
    }
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  autoMigrateAndSeed()
    .then(() => {
      console.log('Seed completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed failed:', error)
      process.exit(1)
    })
}

export { autoMigrateAndSeed }
