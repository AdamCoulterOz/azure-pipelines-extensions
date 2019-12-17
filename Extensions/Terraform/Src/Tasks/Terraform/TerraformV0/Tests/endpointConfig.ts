export abstract class EndpointConfig {

    name: string;
    envVars: Map<string,string>;
    
    constructor(name: string){
        this.name = name;
        this.envVars = new Map<string,string>();
    }

    Init(): void {
        this.envVars.forEach((value: string, key: string) => {
            process.env[key] = value
        });
    }
}

export class EndpointConfigAWS extends EndpointConfig {
    constructor() {
        super("aws");
        this.envVars.set("ENDPOINT_AUTH_SCHEME_AWS","Basic");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AWS_USERNAME',"DummyUsername");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AWS_PASSWORD',"DummaryPassword");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AWS_REGION',"DummaryRegion");
    }
}

export class EndpointConfigAzure extends EndpointConfig {
    constructor() {
        super("azurerm");
        this.envVars.set('ENDPOINT_AUTH_SCHEME_AzureRM','ServicePrincipal');
        this.envVars.set('ENDPOINT_DATA_AzureRM_SUBSCRIPTIONID',"DummySubscriptionId");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALID',"DummyServicePrincipalId");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALKEY',"DummyServicePrincipalKey");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AzureRM_TENANTID',"DummyTenantId");
    }
}

export class EndpointConfigGoogle extends EndpointConfig {
    constructor() {
        super("google");
        this.envVars.set('ENDPOINT_AUTH_SCHEME_GCP','Jwt');
        this.envVars.set('ENDPOINT_DATA_GCP_PROJECT',"DummyProject");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_GCP_ISSUER',"DummyIssuer");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_GCP_AUDIENCE',"DummyAudience");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_GCP_PRIVATEKEY',"DummyPrivateKey");
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_GCP_SCOPE',"DummyScope");
    }
}

export class EndpointConfigRemote extends EndpointConfig {
    constructor() {
        super("remote");
    }
}

export class EndpointConfigLocal extends EndpointConfig {
    constructor() {
        super("local");
    }
}

export class EndpointConfigS3 extends EndpointConfigAWS {
    constructor() {
        super();
        this.envVars.set('ENDPOINT_DATA_S3_BUCKETNAME', 'DummyBucket');
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_S3_KEY', 'DummyKey');
    }
}

export class EndpointConfigGCS extends EndpointConfigGoogle {
    constructor() {
        super();
        this.envVars.set('ENDPOINT_DATA_GCS_BUCKETNAME', 'DummyBucket');
        this.envVars.set('ENDPOINT_DATA_GCS_PREFIX', 'DummyPrefix');
    }
}

export class EndpointConfigAZSA extends EndpointConfigAzure {
    constructor() {
        super();
        this.envVars.set('ENDPOINT_DATA_AZSA_RG', 'DummyResourceGroup');
        this.envVars.set('ENDPOINT_DATA_AZSA_NAME', 'DummyStorageAccount');
        this.envVars.set('ENDPOINT_DATA_AZSA_CONTAINER', 'DummyContainer');
        this.envVars.set('ENDPOINT_AUTH_PARAMETER_AZSA_KEY', 'DummyKey');
    }
}

export function InitProviders() {
    let providers = [];
    providers.push(new EndpointConfigAWS());
    providers.push(new EndpointConfigAzure());
    providers.push(new EndpointConfigGoogle());
    return providers;
}

export function InitBackends() {
    let backends = [];
    backends.push(new EndpointConfigLocal());
    backends.push(new EndpointConfigRemote());
    backends.push(new EndpointConfigS3());
    backends.push(new EndpointConfigAZSA());
    backends.push(new EndpointConfigGCS());
    return backends;
}