import tl = require('azure-pipelines-task-lib/task');

import path = require('path');
import * as Backend from "./backend/backends"
import * as Provider from "./provider/providers"
import { Terraform } from "./terraform";

async function run() {
    tl.setResourcePath(path.join(__dirname, '..', 'task.json'));

    let provider: Provider.Base;
    let backend: Backend.Base;

    try {
        switch(tl.getInput("provider", true)) {
            case "azurerm": provider = new Provider.AzureRM(); break;
            case "aws": provider = new Provider.AWS(); break;
            case "google": provider = new Provider.Google(); break;
            default: throw new Error("Invalid provider specified. Please select AzureRM, AWS or Google.")
        }
    
        switch(tl.getInput("backend", true)) {
            case "local": backend = new Backend.Local(); break;
            case "remote": backend = new Backend.Remote(); break;
            case "azurerm": backend = new Backend.AzureRM(); break;
            case "s3": backend = new Backend.S3(); break;
            case "gcs": backend = new Backend.GCS(); break;
            default: throw new Error("Invalid backend specified. Please select Local, Remote, AzureRM, S3 or GCS.")
        }
    
        // Run the corrresponding command according to command name
        let terraform: Terraform = new Terraform(backend, provider);
        let result;
        switch(tl.getInput("command", true)) {
            case "init": result = await terraform.init(); break;
            case "validate": result = await terraform.validate(); break;
            case "plan": result = await terraform.plan(); break;
            case "apply": result = await terraform.apply(); break;
            case "destroy": result = await terraform.destroy(); break;
            default: throw new Error("Invalid command specified. Please select init, validate, plan, apply or destroy.")
        }
        tl.setResult(tl.TaskResult.Succeeded, "");
        return result;
    }
    catch (error) {
        tl.setResult(tl.TaskResult.Failed, error.message);
        return 0;
    }
}

run();