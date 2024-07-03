import { auth } from "../middleware/auth.middleware.js";
import { productsRoute } from "../routes/products.route.js";

export const initRoutes = (app) => {
  // app.use(auth);
  app.use("/product", productsRoute);
};
