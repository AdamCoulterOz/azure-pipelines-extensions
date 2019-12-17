import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, './ApplyFailEmptyWorkingDirectoryL0.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);
tr.setInput('provider', 'aws');
tr.setInput('command', 'apply');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('environmentServiceNameAWS', 'AWS');
tr.setInput('commandOptions', '');
process.env['ENDPOINT_AUTH_SCHEME_AWS'] = 'Basic';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_USERNAME'] = 'DummyUsername';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_PASSWORD'] = 'DummyPassword';
process.env['ENDPOINT_AUTH_PARAMETER_AWS_REGION'] = 'DummyRegion';

let tp = path.join(__dirname, './AzureApplyFailEmptyWorkingDirectoryL0.js');
tr.setInput('provider', 'azurerm');
tr.setInput('environmentServiceNameAzureRM', 'AzureRM');
process.env['ENDPOINT_AUTH_SCHEME_AzureRM'] = 'ServicePrincipal';
process.env['ENDPOINT_DATA_AzureRM_SUBSCRIPTIONID'] = 'DummmySubscriptionId';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALID'] = 'DummyServicePrincipalId';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALKEY'] = 'DummyServicePrincipalKey';
process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_TENANTID'] = 'DummyTenantId';

let tp = path.join(__dirname, './GCPApplyFailEmptyWorkingDirectoryL0.js');
tr.setInput('provider', 'gcp');
tr.setInput('environmentServiceNameGCP', 'GCP');
process.env['ENDPOINT_AUTH_SCHEME_GCP'] = 'Jwt';
process.env['ENDPOINT_DATA_GCP_PROJECT'] = 'DummyProject';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_ISSUER'] = 'Dummyissuer';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_AUDIENCE'] = 'DummyAudience';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_PRIVATEKEY'] = 'DummyPrivateKey';
process.env['ENDPOINT_AUTH_PARAMETER_GCP_SCOPE'] = 'DummyScope';

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers><unknown>{
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true,
        "exec": {
            "terraform providers": {
                "code": 0,
                "stdout": "Executed successfully"
            },
            "terraform validate": {
                "terraform apply -auto-approve": {
                    "code": 1,
                    "stdout": "Error: No configuration files"
                }
            }
        },
        tr,: .setAnswers(a),
        tr,: .run()
    }
}