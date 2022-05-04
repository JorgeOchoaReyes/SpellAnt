import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Daily {
  @Field(() => String)
  date!: String;

  @Field(() => [String]) 
  hexChars!: String[]; 

  @Field(() => [String])
  wordPool!: String[]; 

  @Field(() => String)
  _id!: String;
 
}