import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApi } from './Constructors/RestApi';
import { DynamoConstruct } from './Constructors/Dynamo';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
    public readonly dynamo: DynamoConstruct;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.dynamo = new DynamoConstruct(this, 'Hello-Dynamo-Construct');

        new RestApi(this, 'Hello-RestApi', {
            dynamo: this.dynamo,
        });
    }
}
