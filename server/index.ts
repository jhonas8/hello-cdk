import api from "./api";
import * as express from "express";
import * as AWS from 'aws-sdk';
import * as cors from 'cors';
import * as QueryString from 'qs';

console.info("Starting server...");

const app = express();

app.use(express.json());
app.use(cors() as any);

function expressToLambda(request: any) {

    return {
        body: JSON.stringify(request.body),
        path: request.path,
        headers: request.headers,
        httpMethod: request.method,
        queryStringParameters: request.query,   
    };
}

app.all('*', async (req, res) => {
    const { path, method } = req;

    const convertUrl = (end: string, p: string) => 
        end.replace(/\{[\w|\s|\d|\S]+\}/g, (match, index) => p.substring(index, p.length).split('/')[0]);

    const getPathParameters = (end: string, p: string) => {
        const params: Record<string, unknown> = {};
        end.replace(/\{[\w|\s|\d|\S]+\}/g, (match, index) => {
            const result = p.substring(index, p.length).split('/')[0];
            const id = match.replace('{', '').replace('}', '');
            params[id] = result;
            return result;
        });
        return params; 
    };

    const route = api.find(
        (r) => r.path === path && r.method === method
    );

    if(!route) {
        return res.status(404).send('Not Found');
    }

    const pathParameters = getPathParameters(route.path, path);

    try {
        const handler = route.handler as any;
        const result = await handler(
            {...expressToLambda(req), pathParameters},
            {awsRequest: (Math.random()*150000).toString()},
        );
    } catch (error) {
        return res.status(500).send((error as Error).message);
    }

    const port = 2503;

    app.listen(port, () =>{
        console.log(`Server is running on port ${port}`);
    });
});

