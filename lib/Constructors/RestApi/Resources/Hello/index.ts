import {Construct} from "constructs";
import {Resource, LambdaIntegration} from "aws-cdk-lib/aws-apigateway";
import {HelloCdkConstruct} from "../../../Lambda/Endpoints/hello";

type Props = {
    restApi: Resource;
};

export class ResourceHello extends Construct {
    
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        const HelloCdk = new HelloCdkConstruct(scope, 'Hello-Lambda', {});

        const resource = props.restApi.addResource('hello');

        resource.addMethod('GET', new LambdaIntegration(HelloCdk.func));
    }
}
