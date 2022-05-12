import { Resolver, Query, Arg } from "type-graphql";
import { DailySet } from "../../../model/Schema";
import { Daily } from "../Entities/Daily";


@Resolver(Daily) 
export class DailyResolver {

    @Query(() => Daily, {nullable: true})
    async daily(): Promise<Daily | undefined> {
        let res: Daily; 
        let today = new Date();
        let strings = [`${today.getUTCDate()}`, `${today.getUTCMonth()}`, `${today.getUTCFullYear()}`]
        let udate =   strings[0] + strings[1] + strings[2][strings[2].length - 1];  
        
        let globalSet = Math.floor(5000*Math.sin(parseInt(udate)) + 5001); 
        

        //random set Math.floor(Math.random() * 11000)
        try {
            res = await DailySet.findOne({_id: `${globalSet}` }).exec();
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

