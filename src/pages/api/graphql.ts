import {ApolloServer} from "apollo-server-micro";
import Cors from 'micro-cors'; 
import { buildSchema } from "type-graphql";
import 'reflect-metadata';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { DailyResolver } from "../../../server/graphql/Resolvers/daily";
import * as mongoose from 'mongoose'; 
require('dotenv').config();


mongoose.connect(process.env.NEXT_PUBLIC_DB_URI)
    .then(() => console.log('You have Successfully Connected MongoDb.........'))
    .catch(err => console.error("There was an error connecting with mongoose: " + err));

const cors = Cors(); 

const schema = await buildSchema({
    resolvers: [DailyResolver]
}) 

const server  = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

const startServer = server.start();

export const config = {
    api: {
        bodyParser: false
    }
  }

export default cors( async (req, res) => {
    await startServer;
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }
    return await server.createHandler({path: "/api/graphql"})(req, res);
});

