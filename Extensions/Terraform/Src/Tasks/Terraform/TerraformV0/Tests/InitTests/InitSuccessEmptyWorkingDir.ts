import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, './AWSInitSuccessEmptyWorkingDirL0.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);
tr.setInput('provider', 'aws');
tr.setInput('command', 'init');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('commandOptions', '');
tr.setInput('backendServiceAWS', 'AWS');
tr.setInput('backendAWSBucketName', 'DummyBucket');
tr.setInput('backendAWSKey', 'DummyKey');
process.env['ENDPOINT_AUTH_SCHEME_AWS'] = 'Basic';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_USERNAME'] = 'DummyUsername';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_PASSWORD'] = 'DummyPassword';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_REGION'] = 'DummyRegion';
let a: ma.TaskLibAnswers = <ma.TaskLibAnswers> {
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true
    "exec": {
        "terraform init -backend-config=bucket=DummyBucket -backend-config=key=DummyKey -backend-config=region=DummyRegion -backend-config=access_key=DummyUsername -backend-config=secret_key=DummyPassword": {
            "code": 0,
            "stdout": "Executed Successfully"
        }
    }
}
tr.setAnswers(a);
tr.run();import ma = require('azure-pipelines-task-lib/mock-answer');
let tp = path.join(__dirname, './AzureInitSuccessEmptyWorkingDirL0.js');
tr.setInput('provider', 'azurerm');
tr.setInput('backendServiceArm', 'AzureRM');
tr.setInput('backendAzureRmResourceGroupName', 'DummyResourceGroup');
tr.setInput('backendAzureRmStorageAccountName', 'DummyStorageAccount');
tr.setInput('backendAzureRmContainerName', 'DummyContainer');
tr.setInput('backendAzureRmKey', 'DummyKey');
process.env['ENDPOINT_AUTH_SCHEME_AzureRM'] = 'ServicePrincipal';
process.env['ENDPOINT_DATA_AzureRM_SUBSCRIPTIONID'] = 'DummmySubscriptionId';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALID'] = 'DummyServicePrincipalId';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALKEY'] = 'DummyServicePrincipalKey';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_TENANTID'] = 'DummyTenantId';
        "terraform init -backend-config=storage_account_name=DummyStorageAccount -backend-config=container_name=DummyContainer -backend-config=key=DummyKey -backend-config=resource_group_name=DummyResourceGroup -backend-config=arm_subscription_id=DummmySubscriptionId -backend-config=arm_tenant_id=DummyTenantId -backend-config=arm_client_id=DummyServicePrincipalId -backend-config=arm_client_secret=DummyServicePrincipalKey": {
tr.run();
let tp = path.join(__dirname, './GCPInitSuccessEmptyWorkingDirL0.js');
tr.setInput('provider', 'gcp');
tr.setInput('commandOptions', '-no-color');
tr.setInput('backendServiceGCP', 'GCP');
tr.setInput('backendGCPBucketName', 'DummyBucket');
tr.setInput('backendGCPPrefix', 'DummyPrefix');
process.env['ENDPOINT_AUTH_SCHEME_GCP'] = 'Jwt';
process.env['ENDPOINT_DATA_GCP_PROJECT'] = 'DummyProject';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_ISSUER'] = 'Dummyissuer';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_AUDIENCE'] = 'DummyAudience';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_PRIVATEKEY'] = 'DummyPrivateKey';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_SCOPE'] = 'DummyScope';
let credentialsFilePath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Tests', 'credentials-123.json');
        [`terraform init -no-color -backend-config=bucket=DummyBucket -backend-config=prefix=DummyPrefix -backend-config=credentials=${credentialsFilePath}`]: {
tr.registerMock('uuid/v4', () => '123');