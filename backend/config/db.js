const mongoose=require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    console.log(`MonogoDB Connected : ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.log(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

module.exports= connectDB;
