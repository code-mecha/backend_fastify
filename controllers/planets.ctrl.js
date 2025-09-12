import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export function getPlanets() {
    return async (request, reply) => {
        const page_limit = 10;
        const { p_page } = request.params;

        let offset;
        let page = 1;
        let next = false;

        if(p_page > 1) {
            page = p_page;
        }

        offset = (page - 1) * 10;

        const planetCount = await prisma.planet.count()
        const results = await prisma.planet.findMany({
            skip: offset,
            take: 10,
        })

        if((offset+page_limit) <= planetCount) {
            next = true
        }

        let api_results = [];

        for (const element of results) {
            let planet = {};
            planet["id"] = element.id;
            planet["name"] = element.name;
            planet["population"] = element.population == null ? 0 : element.population.toString();
            planet["diameter"] = element.diameter;
            planet["rotation_period"] = element.rotation_period;
            planet["orbital_period"] = element.orbital_period;

            api_results.push(planet);
        }

        return {
            error: false,
            next: next,
            count: planetCount,
            results: api_results,
        }
    };
}

export function getPlanetById() {
    return async (request, reply) => {
        const id = parseInt(request.params.id);

        if(isNaN(id)) {
            reply.code(400).type('text/json').send({
                error: true
            })
        }

        const planetDB = await prisma.planet.findUnique({
            where: {
                id: id,
            },
        })

        if(planetDB == null) {
            reply.code(404).type('text/json').send({
                error: true
            })
        }

        let planet = {};
        planet["id"] = planetDB.id;
        planet["name"] = planetDB.name;
        planet["population"] = planetDB.population == null ? 0 : planetDB.population.toString();
        planet["diameter"] = planetDB.diameter;
        planet["rotation_period"] = planetDB.rotation_period;
        planet["orbital_period"] = planetDB.orbital_period;

        return planet
    };
}

export default {getPlanets, getPlanetById};
