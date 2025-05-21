import mongoose from "mongoose";

const connectDb =  async()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected: ${conn.connection.host}`);
  }
  catch(error){
    console.log(error.message);
    process.exit(1);
  }
}

const closeDb = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error(`❌ Error closing MongoDB connection: ${error.message}`);
  }
};

export default { connectDb , closeDb};
