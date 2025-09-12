import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export function getPeople() {
    return async (request, reply) => {
        const page_limit = 10;
        const p_page = request.query.page;

        let offset;
        let page = 1;
        let next = false;

        if (p_page > 1) {
            page = p_page;
        }

        offset = (page - 1) * page_limit;

        const peopleCount = await prisma.people.count()
        const results = await prisma.people.findMany({
            skip: offset,
            take: page_limit,
        })

        if ((offset + page_limit) <= peopleCount) {
            next = true
        }

        let api_results = [];

        for (const element of results) {
            let person = {};
            person["id"] = element.id;
            person["name"] = element.name;
            person["gender"] = element.gender;
            person["height"] = element.height;
            person["mass"] = element.mass;
            person["hair_color"] = element.hair_color;
            person["homeworld"] = process.env.API_DOMAIN + "/planets/" + element.planet_id;
            person["url"] = element.url.replace("https://swapi.dev/api", process.env.API_DOMAIN);

            api_results.push(person);
        }

        return {
            error: false,
            next: next,
            count: peopleCount,
            results: api_results
        }
    };
}

export function getPersonById() {
    return async (request, reply) => {
        const id = parseInt(request.params.id);

        if(isNaN(id)) {
            reply.code(400).type('text/json').send({
                error: true
            })
        }

        const personDB = await prisma.people.findUnique({
            where: {
                id: id,
            },
        })

        if(personDB == null) {
            reply.code(404).type('text/json').send({
                error: true
            })
        }

        let person = {};
        person["id"] = personDB.id;
        person["name"] = personDB.name;
        person["gender"] = personDB.gender;
        person["height"] = personDB.height;
        person["mass"] = personDB.mass;
        person["hair_color"] = personDB.hair_color;
        person["homeworld"] = process.env.API_DOMAIN + "/planets/" + personDB.planet_id;
        person["url"] = personDB.url.replace("https://swapi.dev/api", process.env.API_DOMAIN);

        return person
    };
}

export default {getPeople, getPersonById};
