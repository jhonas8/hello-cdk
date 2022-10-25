import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {RestApi} from './Constructors/RestApi';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new RestApi(this, 'Hello-RestApi', {});
  }
}
