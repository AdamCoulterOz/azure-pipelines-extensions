import tasks = require('azure-pipelines-task-lib/task');
import { Backend } from './base';
import { GoogleHelpers } from "../helpers";

export class BackendGCS extends Backend {
    constructor() { super(); }

    protected setupBackend(backendServiceName: string) {
        this.backendConfig.set('bucket', tasks.getInput("backendGCPBucketName", true)!);
        let prefix = tasks.getInput("backendGCPPrefix", false);
        if(prefix) this.backendConfig.set('prefix', prefix);
        let jsonKeyFilePath = GoogleHelpers.GetJsonKeyFilePath(backendServiceName);
        this.backendConfig.set('credentials', jsonKeyFilePath);
    }
}