import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, "../../index.js");
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);

tr.setInput('provider', 'gcp');
tr.setInput('command', 'init');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('commandOptions', '-no-color');

tr.setInput('backendServiceGCP', 'GCP');
tr.setInput('backendGCPBucketName', 'DummyBucket');
tr.setInput('backendGCPPrefix', 'DummyPrefix');



let credentialsFilePath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Tests', 'credentials-123.json');

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers> {
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true
    },
    "exec": {
        [`terraform init -no-color -backend-config=bucket=DummyBucket -backend-config=prefix=DummyPrefix -backend-config=credentials=${credentialsFilePath}`]: {
            "code": 0,
            "stdout": "Executed Successfully"
        }
    }
}

tr.registerMock('uuid/v4', () => '123');
tr.setAnswers(a);

tr.run();