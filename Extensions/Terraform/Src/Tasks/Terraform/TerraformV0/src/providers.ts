import tasks = require('azure-pipelines-task-lib/task');
import * as ServiceConfig from "./connections"

export abstract class Provider {
    serviceName: string;
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
        this.serviceName = tasks.getInput("environmentServiceNameAzureRM", true);
        this.config = ServiceConfig.AzureRM(this.serviceName);
    }
}

export class AWS extends Provider {
    constructor() { super(); }

    public setupProvider() {
        this.serviceName = tasks.getInput("environmentServiceNameAWS", true);
        this.config = ServiceConfig.AWS(this.serviceName);
    }
}

export class Google extends Provider {
    constructor() { super(); }

    protected setupProvider() {
        this.serviceName = tasks.getInput("environmentServiceNameGCP", true);
        this.config = ServiceConfig.GCP(this.serviceName);
    }
}