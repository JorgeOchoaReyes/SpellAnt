import mongoose from "mongoose";
import { Resolver, Query, Arg } from "type-graphql";
import dbConnect from "../../../Db/dbConnect";
import { DailySet } from "../../../model/Schema";
import { Daily } from "../Entities/Daily";
import mockdata from '../mockData.json'; 


@Resolver(Daily) 
export class DailyResolver {

    @Query(() => Daily, {nullable: true})
    async daily(): Promise<Daily | undefined> {
        await dbConnect(); 
        let res: Daily; 
        try {
            res = await DailySet.findOne({date: "2022/05/03"}).exec();

        }
        catch (error) {
            console.log('This is the error', error); 
        }
        if(!res) throw Error("No data was returned!");

        return {
            date: res.date,
            hexChars: res.hexChars,
            wordPool: res.wordPool,
            _id: res._id
        }; 
    }

    @Query(() => Daily, { nullable: true })
    getOtherDaily(
        @Arg("date", () => Date) date: Date)
        : Daily | undefined {
      const chosenDay = date.getUTCFullYear() + '/' + date.getUTCMonth() + '/' + date.getUTCDay();  
      if (chosenDay === undefined) {
        throw new Error("No day found!");
      }

      return ;
    }
}

