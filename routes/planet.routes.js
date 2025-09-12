import planetCtrl from "../controllers/planets.ctrl.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    fastify.get('/', planetCtrl.getPlanets())
    fastify.get('/:id', planetCtrl.getPlanetById())
}

export default routes;
