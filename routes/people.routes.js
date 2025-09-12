import peopleCtrl from './../controllers/people.ctrl.js'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    fastify.get('/', peopleCtrl.getPeople())
    fastify.get('/:id', peopleCtrl.getPersonById())
}

export default routes;
