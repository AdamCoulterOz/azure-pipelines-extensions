import { Terraform as TerraformCommandHandlerAWS } from '../../src/terraform';
import tl = require('azure-pipelines-task-lib');

let backend: any = "aws"
let provider: any = "s3"
let terraformCommandHandlerAWS: TerraformCommandHandlerAWS = new TerraformCommandHandlerAWS(backend, provider);
export async function run() {
    try {
        const response = await terraformCommandHandlerAWS.validate();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'AWSValidateSuccessEmptyWorkingDirL0 should have succeeded.');
        } else {
            tl.setResult(tl.TaskResult.Failed, 'AWSValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
        }
    } catch (error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
    }
}
run(); import { Terraform as terraformCommandHandlerAzureRM } from '../../../src/terraform';
let backend: any = "azurerm"
let provider: any = "azurerm"
let TerraformCommandHandlerAzureRM: terraformCommandHandlerAzureRM = new terraformCommandHandlerAzureRM(backend, provider);
const response = await TerraformCommandHandlerAzureRM.validate();
tl.setResult(tl.TaskResult.Succeeded, 'AzureValidateSuccessEmptyWorkingDirL0 should have succeeded.');
tl.setResult(tl.TaskResult.Failed, 'AzureValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
tl.setResult(tl.TaskResult.Failed, 'AzureValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
run(); import { Terraform as TerraformCommandHandlerGCP } from '../../../src/terraform';
let backend: any = "gcp"
let provider: any = "gcp"
let terraformCommandHandlerGCP: TerraformCommandHandlerGCP = new TerraformCommandHandlerGCP(backend, provider);
const response = await terraformCommandHandlerGCP.validate();
tl.setResult(tl.TaskResult.Succeeded, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded.');
tl.setResult(tl.TaskResult.Failed, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
tl.setResult(tl.TaskResult.Failed, 'GCPValidateSuccessEmptyWorkingDirL0 should have succeeded but failed.');
run();