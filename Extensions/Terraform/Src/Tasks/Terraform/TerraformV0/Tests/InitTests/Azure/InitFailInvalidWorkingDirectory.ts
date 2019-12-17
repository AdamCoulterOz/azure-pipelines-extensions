import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, './AzureInitFailInvalidWorkingDirectoryL0.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);

tr.setInput('provider', 'azurerm');
tr.setInput('command', 'init');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('commandOptions', '');

tr.setInput('backendServiceArm', 'AzureRM');
tr.setInput('backendAzureRmResourceGroupName', 'DummyResourceGroup');
tr.setInput('backendAzureRmStorageAccountName', 'DummyStorageAccount');
tr.setInput('backendAzureRmContainerName', 'DummyContainer');
tr.setInput('backendAzureRmKey', 'DummyKey');



let a: ma.TaskLibAnswers = <ma.TaskLibAnswers> {
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true
    },
    "exec": {
        "terraform init -backend-config=storage_account_name=DummyStorageAccount -backend-config=container_name=DummyContainer -backend-config=key=DummyKey -backend-config=resource_group_name=DummyResourceGroup -backend-config=arm_subscription_id=DummmySubscriptionId -backend-config=arm_tenant_id=DummyTenantId -backend-config=arm_client_id=DummyServicePrincipalId -backend-config=arm_client_secret=DummyServicePrincipalKey": {
            "code": 1,
            "stdout": "There are some problems with the configuration, described below.\n\nThe Terraform configuration must be valid before initialization so that Terraform can determine which modules and providers need to be installed."
        }
    }
}

tr.setAnswers(a);

tr.run();
