export interface IEndpointConfig {

    name: string;
    Init(): void;
}

export class EndpointConfigAWS implements IEndpointConfig {

    name: string;
    username: string;
    password: string;
    region: string;

    constructor(username: string, password: string, region: string) {
        this.name = "aws";
        this.username = username;
        this.password = password;
        this.region = region;
    }

    public Init() {
        process.env['ENDPOINT_AUTH_SCHEME_AWS'] = 'Basic';
        process.env['ENDPOINT_AUTH_PARAMETER_AWS_USERNAME'] = this.username;
        process.env['ENDPOINT_AUTH_PARAMETER_AWS_PASSWORD'] = this.password;
        process.env['ENDPOINT_AUTH_PARAMETER_AWS_REGION'] = this.region;
    }
}

export class EndpointConfigAzure implements IEndpointConfig {

    name: string;
    subscriptionId: string;
    spId: string;
    spKey: string;
    tenantId: string;

    constructor(subscriptionId: string, spId: string, spKey: string, tenantId: string) {
        this.name = "azurerm";
        this.subscriptionId = subscriptionId;
        this.spId = spId;
        this.spKey = spKey;
        this.tenantId = tenantId;
    }

    public Init() {
        process.env['ENDPOINT_AUTH_SCHEME_AzureRM'] = 'ServicePrincipal';
        process.env['ENDPOINT_DATA_AzureRM_SUBSCRIPTIONID'] = this.subscriptionId;
        process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALID'] = this.spId;
        process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALKEY'] = this.spKey;
        process.env['ENDPOINT_AUTH_PARAMETER_AzureRM_TENANTID'] = this.tenantId;
    }
}

export class EndpointConfigGoogle implements IEndpointConfig {

    name: string;
    project: string;
    issuer: string;
    audience: string;
    privateKey: string;
    scope: string;

    constructor(project: string, issuer: string, audience: string, privateKey: string, scope: string) {
        this.name = "google";
        this.project = project;
        this.issuer = issuer;
        this.audience = audience;
        this.privateKey = privateKey;
        this.scope = scope;
    }

    public Init() {
        process.env['ENDPOINT_AUTH_SCHEME_GCP'] = 'Jwt';
        process.env['ENDPOINT_DATA_GCP_PROJECT'] = this.project;
        process.env['ENDPOINT_AUTH_PARAMETER_GCP_ISSUER'] = this.issuer;
        process.env['ENDPOINT_AUTH_PARAMETER_GCP_AUDIENCE'] = this.audience;
        process.env['ENDPOINT_AUTH_PARAMETER_GCP_PRIVATEKEY'] = this.privateKey;
        process.env['ENDPOINT_AUTH_PARAMETER_GCP_SCOPE'] = this.scope;
    }
}

export function InitProviders() {
    let providers = [];
    providers.push(new EndpointConfigAWS("DummyUsername", "DummyPassword", "DummyRegion"));
    providers.push(new EndpointConfigAzure("DummySubscriptionId", "DummyServicePrincipalId", "DummyServicePrincipalKey", "DummyTenantId"));
    providers.push(new EndpointConfigGoogle("DummyProject", "DummyIssuer", "DummyAudience", "DummyPrivateKey", "DummyScope"));
    return providers;
}