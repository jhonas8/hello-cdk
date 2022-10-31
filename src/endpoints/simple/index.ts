import { APIGatewayProxyHandler } from 'aws-lambda';
import { Dynamo } from '../../services/dynamo';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    try {
        const { body } = event;

        if (!body) throw Error('No body found');

        const { name, age, email } = JSON.parse(body);

        if (!name || !age || !email) throw Error('Missing required fields');

        await Dynamo.createSimpleData({ name, age, email });

        return {
            statusCode: 201,
            body: JSON.stringify({ success: true }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};
