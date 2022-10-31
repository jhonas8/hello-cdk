// External libraries
import { Duration } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

interface Props {
    tableName: string;
}

export class SimplePOST extends Construct {
    public readonly func: NodejsFunction;

    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        this.func = new NodejsFunction(scope, `Hello-POST-simple-lambda`, {
            runtime: Runtime.NODEJS_14_X,
            entry: path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                '..',
                'src',
                'endpoints',
                'simple',
                'index.ts',
            ),
            handler: 'handler',
            timeout: Duration.seconds(60),
            environment: {
                TABLE: props.tableName,
            },
        });

        this.func.addToRolePolicy(
            new PolicyStatement({
                actions: ['sns:*'],
                resources: ['*'],
            }),
        );
    }
}
