import ma = require('azure-pipelines-task-lib/mock-answer');

export function TerraformMock(): ma.TaskLibAnswers {
    return <ma.TaskLibAnswers> {
        "which": {
            "terraform": "terraform"
        },
        "checkPath": {
            "terraform": true
        },
        "exec": {
            "terraform providers": {
                "code": 0,
                "stdout": "Executed successfully"
            },
            "terraform validate": {
                "code": 0,
                "stdout": "Executed successfully"
            },
            "terraform apply -auto-approve": {
                "code": 1,
                "stdout": "Error: No configuration files"
            }
        }
    }
}