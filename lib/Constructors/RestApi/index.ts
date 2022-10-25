import {Construct} from "constructs";
import {Resource, RestApi as CDKRestApi, Cors} from "aws-cdk-lib/aws-apigateway";
import {ResourceHello} from "./Resources/Hello";

type Props = {};
export class RestApi extends Construct {
    public readonly restApi: CDKRestApi;
    public readonly apiV1: Resource;
    
    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id);

        this.restApi = new CDKRestApi(scope, 'VH-Gateway-Api', {    
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS,
            },
        });

        this.apiV1 = this.restApi.root.addResource('v1');

        new ResourceHello(scope, 'VH-Gateway-Api-Resource-Hello', {
            restApi: this.apiV1,
        });
    }
}
