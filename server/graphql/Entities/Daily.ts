import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Daily {

  @Field(() => [String]) 
  hexChars!: String[]; 

  @Field(() => [String])
  wordPool!: String[]; 

  @Field(() => Number)
  _id!: Number;
 
}