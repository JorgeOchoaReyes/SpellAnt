import { Resolver, Query, Arg } from "type-graphql";
import { Dog } from "../Entities/Dog";
import mockdata from '../mockData.json'; 

@Resolver(Dog) 
export class DogResolver {
    @Query(() => [Dog])
    dogs(): Dog[] {
        return mockdata; 
    }
    @Query(() => Dog, { nullable: true })
    dog(@Arg("name", () => String) name: string): Dog | undefined {
      const dog = mockdata.find((dog) => dog.name === name);
      if (dog === undefined) {
        throw new Error("Dog not found");
      }
      return dog;
    }
}