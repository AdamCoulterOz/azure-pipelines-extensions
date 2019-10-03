import tasks = require('azure-pipelines-task-lib/task');
import { Handler } from './handler';
import path = require('path');

async function run() {
    tasks.setResourcePath(path.join(__dirname, '..', 'task.json'));

    let handler = new Handler();
    try {
        await handler.execute(tasks.getInput("provider"), tasks.getInput("command"));
        tasks.setResult(tasks.TaskResult.Succeeded, "");
    } catch (error) {
        tasks.setResult(tasks.TaskResult.Failed, error);
    }
}

run();