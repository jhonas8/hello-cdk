import { Construct } from 'constructs';
import {
    Table,
    AttributeType,
    BillingMode,
    ProjectionType,
} from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from 'aws-cdk-lib';

export class DynamoConstruct extends Construct {
    table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(scope, 'Hello-Dynamo-Table', {
            partitionKey: { name: 'id', type: AttributeType.STRING },
            tableName: 'Simple-Table',
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}
