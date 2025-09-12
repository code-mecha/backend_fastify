import cluster from 'cluster'
import cpus from 'os'
import Fastify from 'fastify' // Import the framework and instantiate it
import { autoMigrateAndSeed } from './prisma/seed.js'
import people_routes from './routes/people.routes.js'
import planet_routes from './routes/planet.routes.js'

const fastify = Fastify({
    logger: true,
    routerOptions: {
        ignoreTrailingSlash: true
    }
})

// App routes
fastify.register(people_routes, { prefix: 'people' })
fastify.register(planet_routes, { prefix: 'planets' })

// Home route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

const totalCPUs = cpus.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Auto migrate and seed database
    await autoMigrateAndSeed();

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died ${code} ${signal}`);
    });
} else {
    const start = async () => {
        // Run the server!
        try {
            console.log(`Worker ${process.pid} is running`);
            await fastify.listen({ host: '0.0.0.0', port: 3000 })
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    }
    await start();
}
