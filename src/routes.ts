import { v4 as uuidv4 } from "uuid";
import { ensureAuthenticated } from "./middleware";
interface ProductsDTO {
  name: string;
  description: string;
  price: number;
  id: string;
}

const products: ProductsDTO[] = [];

async function routes(fastify: any, options: any) {
  fastify.get("/", async (request: any, reply: any) => {
    return { hello: "world" };
  });
  
  fastify.get(
    "/products/findByName",
    // ensureAuthenticated,
    (request: any, response: any) => {
      const { name } = request.query;
      const product = products.filter((p) => p.name.includes(String(name)));
      return response.json(product);
    }
  );

  fastify.get("/products/:id", (request: any, response: any) => {
    const { id } = request.params;
    const product = products.find((p) => p.id === id);
    return response.json(product);
  });

  fastify.post(
    "/products",
    // ensureAuthenticated,
    (request: any, response: any) => {
      const { name, description, price } = request.body;

      const productAlreadyExists = products.find(
        (product) => product.name === name
      );
      if (productAlreadyExists)
        return response.status(400).json({ message: "Product Already Exists" });

      const product: ProductsDTO = { description, name, price, id: uuidv4() };
      products.push(product);

      return response.json(product);
    }
  );
}

export { routes };
