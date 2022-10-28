import { Construct } from 'constructs';
import { Resource, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { HelloCdkConstruct } from '../../../Lambda/Endpoints/hello';

type Props = {
    restApi: Resource;
};

// The Resource Construct is a CDK construct that allows us to add a resources
// (such as methods) to an API endpoint.

export class ResourceHello extends Construct {
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        // This construct implements the handler to be called
        // as a Lambda function to the endpoint /v1/hello.
        // The handler is defined in the file src/endpoints/hello/index.ts
        const HelloCdk = new HelloCdkConstruct(scope, 'Hello-Lambda');

        const resource = props.restApi.addResource('hello'); //Adding the endpoint /hello to the passed path. In this case, it's /v1/hello

        resource.addMethod('GET', new LambdaIntegration(HelloCdk.func)); //Attaching the GET method to the endpoint /v1/hello
    }
}
