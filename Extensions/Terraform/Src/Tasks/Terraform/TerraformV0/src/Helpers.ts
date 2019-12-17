import tasks = require('azure-pipelines-task-lib/task');
import path = require('path');
import uuidV4 = require('uuid/v4');

export class GoogleHelpers
{
    static GetJsonKeyFilePath(serviceName: string) {
        // Get credentials for json file
        const jsonKeyFilePath = path.resolve(`credentials-${uuidV4()}.json`);

        let clientEmail = tasks.getEndpointAuthorizationParameter(serviceName, "Issuer", false);
        let tokenUri = tasks.getEndpointAuthorizationParameter(serviceName, "Audience", false);
        let privateKey = tasks.getEndpointAuthorizationParameter(serviceName, "PrivateKey", false);

        // Create json string and write it to the file
        let jsonCredsString = `{"type": "service_account", "private_key": "${privateKey}", "client_email": "${clientEmail}", "token_uri": "${tokenUri}"}`
        tasks.writeFile(jsonKeyFilePath, jsonCredsString);

        return jsonKeyFilePath;
    }
}