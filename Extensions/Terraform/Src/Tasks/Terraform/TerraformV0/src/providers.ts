import tasks = require('azure-pipelines-task-lib/task');
import * as ServiceConfig from "./service-connections"

export abstract class Provider {
    config: Map<string, string>;
    protected abstract setupProvider();

    constructor() {
        this.config = new Map<string, string>();
        this.setupProvider();
    }
}

export class AzureRM extends Provider {
    constructor() { super(); }

    public setupProvider() {
        let serviceName = tasks.getInput("environmentServiceNameAzureRM", false);
        this.config = ServiceConfig.AzureRM(serviceName);
    }
}

export class AWS extends Provider {
    constructor() { super(); }

    public setupProvider() {
        let serviceName = tasks.getInput("environmentServiceNameAWS", false);
        this.config = ServiceConfig.AWS(serviceName);
    }
}

export class Google extends Provider {
    constructor() { super(); }

    protected setupProvider() {
        let serviceName = tasks.getInput("environmentServiceNameGCP", true);
        this.config = ServiceConfig.GCP(serviceName);
    }
}