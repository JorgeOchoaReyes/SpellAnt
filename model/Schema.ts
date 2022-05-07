import mongoose from "mongoose";
import { Daily } from "../server/graphql/Entities/Daily";

export const DailySet = mongoose.model<Daily>('Daily', new mongoose.Schema<Daily>({
    hexChars: {type: [String]}, 
    wordPool: {type: [String]},
    _id: {type: Number}
}), 'Daily');

