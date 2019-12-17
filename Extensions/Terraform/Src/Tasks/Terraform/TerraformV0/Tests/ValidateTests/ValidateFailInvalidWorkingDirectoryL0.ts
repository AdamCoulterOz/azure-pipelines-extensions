import { Terraform as TerraformCommandHandlerAWS } from '../../../src/terraform';
import tl = require('azure-pipelines-task-lib');

let backend:any = "aws"
let provider:any = "s3"
let terraformCommandHandlerAWS: TerraformCommandHandlerAWS = new TerraformCommandHandlerAWS(backend, provider);
export async function run() {
    try {
        await terraformCommandHandlerAWS.validate();
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSValidateFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
    }
}
run();import { Terraform as terraformCommandHandlerAzureRM } from '../../../src/terraform';
let backend:any = "azurerm"
let provider:any = "azurerm"
let TerraformCommandHandlerAzureRM: terraformCommandHandlerAzureRM = new terraformCommandHandlerAzureRM(backend, provider);
        await TerraformCommandHandlerAzureRM.validate();
        tl.setResult(tl.TaskResult.Failed, 'AzureValidateFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
run();import { Terraform as TerraformCommandHandlerGCP } from '../../../src/terraform';
let backend:any = "gcp"
let provider:any = "gcp"
let terraformCommandHandlerGCP: TerraformCommandHandlerGCP = new TerraformCommandHandlerGCP(backend,provider);
        await terraformCommandHandlerGCP.validate();
        tl.setResult(tl.TaskResult.Failed, 'GCPValidateFailInvalidWorkingDirectoryL0 should have succeeded but failed with error.');
run();