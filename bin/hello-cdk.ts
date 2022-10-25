#!/usr/bin/env node

// ---------* Libraries *-------//
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

//----------* Stack *----------//
import { HelloCdkStack } from '../lib/hello-cdk-stack';

const app = new cdk.App();
new HelloCdkStack(app, 'HelloCdkStack', {});
