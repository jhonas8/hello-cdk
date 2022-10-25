import {Construct} from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {Runtime} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import {Duration} from 'aws-cdk-lib';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';

type Props = {}

export class HelloCdkConstruct extends Construct {
    public readonly func: NodejsFunction;

    constructor(scope: Construct, id: string, props: Props) {
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

        this.func.addToRolePolicy(
            new PolicyStatement({
                actions: ['sns:*'],
                resources: ['*'],
            })
        );
    }
}
