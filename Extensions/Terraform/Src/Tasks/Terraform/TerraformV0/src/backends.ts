import tasks = require('azure-pipelines-task-lib/task');
import * as ServiceConfig from "./connections"

export abstract class Backend {
    config: Map<string, string>;
    protected abstract setupBackend();

    constructor() {
        this.config = new Map<string, string>();
        this.setupBackend();
    }
}

export class BackendAzureRM extends Backend {
    constructor() { super(); }

    protected setupBackend() {
        let serviceName = tasks.getInput("backendServiceArm", true);
        this.config = ServiceConfig.AzureRM(serviceName);
        this.config['storage_account_name'] = tasks.getInput("backendAzureRmStorageAccountName", true);
        this.config['container_name'] = tasks.getInput("backendAzureRmContainerName", true);
        this.config['key'] = tasks.getInput("backendAzureRmKey", true);
        this.config['resource_group_name'] = tasks.getInput("backendAzureRmResourceGroupName", true);
    }
}

export class BackendS3 extends Backend {
    constructor() { super(); }

    protected setupBackend() {
        let serviceName = tasks.getInput("backendServiceAWS", true);
        this.config = ServiceConfig.AWS(serviceName);
        this.config['bucket'] = tasks.getInput("backendAWSBucketName", true);
        this.config['key'] = tasks.getInput("backendAWSKey", true);
        this.config['region'] = tasks.getEndpointAuthorizationParameter(serviceName, "region", true);
    }
}

export class BackendGCS extends Backend {
    constructor() { super(); }

    protected setupBackend() {
        let serviceName = tasks.getInput("backendServiceGCP", true);
        this.config = ServiceConfig.GCP(serviceName);
        this.config['bucket'] = tasks.getInput("backendGCPBucketName", true);
        this.config['prefix'] = tasks.getInput("backendGCPPrefix", false);
    }
}