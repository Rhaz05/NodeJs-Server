import { productsRoute } from "../routes/products.route.js";

export const initRoutes = (app) => {
  app.use("/product", productsRoute);
};
