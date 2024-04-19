import fastify from "fastify";
import { routes } from "./routes";

const app = fastify({
  logger: true,
});

// app.get("/terms", (request, response) => {
//   return response.send({ message: "Termos de serviço" });
// });
app.register(routes, {prefix:'/v1'});


app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
