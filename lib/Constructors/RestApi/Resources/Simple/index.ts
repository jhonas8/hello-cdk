import { Construct } from 'constructs';
import { SimplePOST } from '../../../Lambda/Endpoints/simple';
import {
    Resource,
    LambdaIntegration,
    AuthorizationType,
} from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

type Props = {
    restApi: Resource;
    table: Table;
};

export class ResourceSimple extends Construct {
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        const simplePOST = new SimplePOST(scope, 'Hello-POST-simple', {
            tableName: 'Simple-Table',
        });

        const resource = props.restApi.addResource('simple');

        resource.addMethod('POST', new LambdaIntegration(simplePOST.func), {
            authorizationType: AuthorizationType.NONE,
        });

        props.table.grantWriteData(simplePOST.func);
    }
}
