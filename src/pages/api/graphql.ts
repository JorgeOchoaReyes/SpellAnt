import {ApolloServer} from "apollo-server-micro";
import Cors from 'micro-cors'; 
import { buildSchema } from "type-graphql";
import 'reflect-metadata';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { DailyResolver } from "../../../server/graphql/Resolvers/daily";
import dbConnect from "../../../Db/dbConnect";
import mongoose from "mongoose";

require('dotenv').config();

if(mongoose.connection.readyState == 0) {
    let db = await dbConnect()
}


const cors = Cors(); 

const schema = await buildSchema({
    resolvers: [DailyResolver]
}) 

const server  = new ApolloServer({
    schema,
    plugins: [process.env.NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground(),]
})

const startServer = server.start();

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req, res) => {
    await startServer;
    
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }
    return await server.createHandler({path: "/api/graphql"})(req, res);
};

