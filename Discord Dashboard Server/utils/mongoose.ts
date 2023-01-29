import mongoose from "mongoose";
import config from "../config";

const mongooseConnect = function () {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.mongoURL).then(() => {
    console.log("Connected to MongoDB");
})};

export default mongooseConnect;