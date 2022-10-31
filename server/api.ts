import { handler as HelloHandler } from '../src/endpoints/hello';
import { handler as SimpleHandler } from '../src/endpoints/simple';

import { APIGatewayProxyHandler } from 'aws-lambda';

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface Handler {
    path: string;
    handler: APIGatewayProxyHandler;
    method: Methods;
}

const handlers: Handler[] = [
    {
        path: '/v1/hello',
        method: Methods.GET,
        handler: HelloHandler,
    },
    {
        path: '/v1/simple',
        method: Methods.POST,
        handler: SimpleHandler,
    },
];

export default handlers;
