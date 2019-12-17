import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let tp = path.join(__dirname, './AWSValidateFailInvalidWorkingDirectoryL0.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(tp);
tr.setInput('provider', 'aws');
tr.setInput('command', 'validate');
tr.setInput('workingDirectory', 'DummyWorkingDirectory');
tr.setInput('commandOptions', '');
let a: ma.TaskLibAnswers = <ma.TaskLibAnswers> {
    "which": {
        "terraform": "terraform"
    },
    "checkPath": {
        "terraform": true
    "exec": {
        "terraform validate": {
            "code": 1,
            "stdout": "Execution failed: invalid config files"
        }
    }
}
tr.setAnswers(a);
tr.run();import ma = require('azure-pipelines-task-lib/mock-answer');
let tp = path.join(__dirname, './AzureValidateFailInvalidWorkingDirectoryL0.js');
tr.setInput('provider', 'azurerm');
let tp = path.join(__dirname, './GCPValidateFailInvalidWorkingDirectoryL0.js');
tr.setInput('provider', 'gcp');
tr.run();