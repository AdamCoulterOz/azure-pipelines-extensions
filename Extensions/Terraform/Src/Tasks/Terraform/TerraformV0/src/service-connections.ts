import tasks = require('azure-pipelines-task-lib/task');
import path = require('path');
import * as uuidV4 from 'uuid/v4';

export function AzureRM(serviceName : string) : Map<string,string> {
    let config = new Map<string,string>();
    config['ARM_SUBSCRIPTION_ID'] = tasks.getEndpointDataParameter(serviceName, "subscriptionid", false); 
    config['ARM_TENANT_ID'] = tasks.getEndpointAuthorizationParameter(serviceName, "tenantid", false);
    config['ARM_CLIENT_ID'] = tasks.getEndpointAuthorizationParameter(serviceName, "serviceprincipalid", false);
    config['ARM_CLIENT_SECRET'] = tasks.getEndpointAuthorizationParameter(serviceName, "serviceprincipalkey", false);
    return config;
}

export function AWS(serviceName : string) : Map<string,string> {
    let config = new Map<string,string>();
    config['AWS_ACCESS_KEY_ID'] = tasks.getEndpointAuthorizationParameter(serviceName, "username", false);
    config['AWS_SECRET_ACCESS_KEY'] = tasks.getEndpointAuthorizationParameter(serviceName, "password", false);
    return config;
}

export function GCP(serviceName : string) : Map<string,string> {
    let config = new Map<string,string>();
    const jsonKeyFilePath = path.resolve(`credentials-${uuidV4()}.json`);

    let clientEmail = tasks.getEndpointAuthorizationParameter(serviceName, "Issuer", false);
    let tokenUri = tasks.getEndpointAuthorizationParameter(serviceName, "Audience", false);
    let privateKey = tasks.getEndpointAuthorizationParameter(serviceName, "PrivateKey", false);

    // Create json string and write it to the file
    let jsonCredsString = `{"type": "service_account", "private_key": "${privateKey}", "client_email": "${clientEmail}", "token_uri": "${tokenUri}"}`
    tasks.writeFile(jsonKeyFilePath, jsonCredsString);
    
    config['GOOGLE_CREDENTIALS'] = `${jsonKeyFilePath}`;
    config['GOOGLE_PROJECT'] = tasks.getEndpointDataParameter(serviceName, "project", false);
    return config;
}