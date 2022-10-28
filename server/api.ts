import { handler as HelloHandler } from '../src/endpoints/hello';
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
];

export default handlers;
