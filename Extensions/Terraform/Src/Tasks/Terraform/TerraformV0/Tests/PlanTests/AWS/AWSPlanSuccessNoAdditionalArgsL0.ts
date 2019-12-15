import { ToolCommands as TerraformCommandHandlerAWS } from '../../../src/toolcmds';
import tl = require('azure-pipelines-task-lib');

let terraformCommandHandlerAWS: TerraformCommandHandlerAWS = new TerraformCommandHandlerAWS();

export async function run() {
    try {
        const response = await terraformCommandHandlerAWS.onlyPlan();
        if (response === 0) {
            tl.setResult(tl.TaskResult.Succeeded, 'AWSPlanSuccessNoAdditionalArgsL0 should have succeeded.');
        } else{
            tl.setResult(tl.TaskResult.Failed, 'AWSPlanSuccessNoAdditionalArgsL0 should have succeeded but failed.');
        }
    } catch(error) {
        tl.setResult(tl.TaskResult.Failed, 'AWSPlanSuccessNoAdditionalArgsL0 should have succeeded but failed.');
    }
}

run();