import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class HelloLambda extends Construct {
    public readonly func: NodejsFunction;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.func = new NodejsFunction(scope, 'Hello-GET-Function', {
            runtime: Runtime.NODEJS_12_X,
            entry: path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                '..',
                'src',
                'endpoints',
                'hello',
                'index.ts',
            ),
            handler: 'handler',
            timeout: Duration.seconds(10),
        });

        // This method is adding AWS policies to current instance of the AWS IAM refered on the construct.
        this.func.addToRolePolicy(
            new PolicyStatement({
                actions: ['sns:*'], // This allows all regions of Amazon SNS.
                resources: ['*'],
            }),
        );
    }
}
