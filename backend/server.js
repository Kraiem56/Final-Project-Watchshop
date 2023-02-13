const path =require( "path");
const colors =require( "colors");
const dotenv =require( "dotenv");
const connectDB =require( "./config/db.js");
const express =require( "express");
const morgan =require( "morgan");
const cors =require( "cors");
const productRoutes =require( "./routes/productRoutes.js");
const userRoutes =require( "./routes/userRoutes.js");
const orderRoutes =require( "./routes/orderRoutes.js");
const uploadRoutes =require( "./routes/uploadRoutes.js");
const { errorHandler, notFound } =require( "./middleware/errorMiddleware.js");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
dotenv.config();

connectDB();

app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYMENT_CLIENT_ID)
);

const dirname = path.resolve();

app.use("/uploads", express.static(path.join(dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
