import { Construct } from 'constructs';
import {
    Resource,
    RestApi as CDKRestApi,
    Cors,
} from 'aws-cdk-lib/aws-apigateway';
import { ResourceHello } from './Resources/Hello';

export class RestApi extends Construct {
    public readonly restApi: CDKRestApi;
    public readonly apiV1: Resource;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.restApi = new CDKRestApi(scope, 'VH-Gateway-Api', {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS,
            },
        });

        // By doing this, we're adding the endpoint /v1 to the API (e.g. https://api.example.com/v1)
        this.apiV1 = this.restApi.root.addResource('v1');

        // Adding the endpoint /v1/hello to the API (e.g. https://api.example.com/v1/hello)
        // and attaching HTTP's methods to it.
        new ResourceHello(scope, 'VH-Gateway-Api-Resource-Hello', {
            restApi: this.apiV1,
        });
    }
}
