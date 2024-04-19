import { FastifyRequest, FastifyReply } from "fastify";

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const token = request.headers.authorization;

  if (!token) {
    reply.status(401).send();
    return;
  }

  const [, user] = token.split(" ");

  if (user === "admin") {
    return;
  }

  reply.status(401).send();
}
