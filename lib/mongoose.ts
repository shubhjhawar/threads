import mongoose from 'mongoose';

let isConnected = false;


export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log("mongodb_url not found!!");

    if(isConnected) return console.log("already connected");

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        
        console.log("DB connected!");

    } catch(error) {
        console.log("error");
    }

}