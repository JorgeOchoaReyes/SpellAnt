import { Resolver, Query, Arg } from "type-graphql";
import { DailySet } from "../../../model/Schema";
import { Daily } from "../Entities/Daily";


@Resolver(Daily) 
export class DailyResolver {

    @Query(() => Daily, {nullable: true})
    async daily(): Promise<Daily | undefined> {
        let res: Daily; 
        

        try {
            res = await DailySet.findOne({_id: `${Math.floor(Math.random() * 11000)}` }).exec();
        }
        catch (error) {
            console.log('This is the error', error); 
        }
        if(!res) throw Error("No data was returned!");

        return {
            hexChars: res.hexChars,
            wordPool: res.wordPool,
            _id: res._id
        }; 
    }

    @Query(() => Daily, { nullable: true })
    getOtherDaily(
        @Arg("date", () => Date) date: Date)
        : Daily | undefined {
       

      return ;
    }
}

