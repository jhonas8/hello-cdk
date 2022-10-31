import { unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDB } from 'aws-sdk';
import { SimpleMetaData } from '../../@types/dynamo';
import * as uuid from 'uuid';

export class Dynamo {
    public static async createSimpleData(
        simple: Omit<SimpleMetaData, 'id'>,
    ): Promise<void> {
        const tableName = 'Simple-Table';
        const dynamoDb = new DynamoDB();
        const newItem: DynamoDB.PutItemInputAttributeMap = {
            id: { S: uuid.v1() },
            name: { S: simple.name },
            age: { S: simple.age },
            email: { S: simple.email },
        };

        await dynamoDb
            .putItem({
                TableName: tableName,
                Item: newItem,
            })
            .promise();
    }

    public static async getSimpleData(id: string): Promise<SimpleMetaData> {
        const tableName = 'Simple-Table';
        const dynamoDb = new DynamoDB();
        const result = await dynamoDb
            .getItem({
                TableName: tableName,
                Key: {
                    id: { S: id },
                },
            })
            .promise();

        if (!result.Item) {
            throw new Error('No item found');
        }
        const finalResult = unmarshall(result.Item);
        return finalResult as SimpleMetaData;
    }
}
