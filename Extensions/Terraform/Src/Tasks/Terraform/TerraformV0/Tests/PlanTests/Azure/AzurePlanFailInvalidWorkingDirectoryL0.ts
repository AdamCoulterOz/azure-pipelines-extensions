import { Terraform as terraformCommandHandlerAzureRM } from '../../../src/terraform';
import tl = require('azure-pipelines-task-lib');

let backend:any = "azurerm"
let provider:any = "azurerm"
let TerraformCommandHandlerAzureRM: terraformCommandHandlerAzureRM = new terraformCommandHandlerAzureRM(backend, provider);

export async function run() {
    try {
        await TerraformCommandHandlerAzureRM.onlyPlan();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AzurePlanFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
    }
}

run();