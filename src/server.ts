import { fastify, FastifyRequest, FastifyReply } from "fastify";

import { routes } from "./routes";

const app = fastify({
  logger: true,
});
app.register(require("@fastify/swagger"));
app.register(require("@fastify/swagger-ui"), {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: Function
    ) {
      next();
    },
    preHandler: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: Function
    ) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
  transformSpecification: (
    swaggerObject: any,
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});
app.register(routes, { prefix: "/v1" });

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
