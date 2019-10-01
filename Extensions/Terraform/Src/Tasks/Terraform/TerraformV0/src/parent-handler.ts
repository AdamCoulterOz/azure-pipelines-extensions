import * as Providers from "./providers";

export interface IParentCommandHandler {
    execute(providerName: string, command: string): Promise<number>;
}

export class ParentCommandHandler implements IParentCommandHandler {
    public async execute(providerName: string, command: string): Promise<number> {
        // Create corresponding command handler according to provider name
        let provider: Providers.Provider;

        switch(providerName) {
            case "azurerm":
                provider = new Providers.AzureRM();
                break;
            
            case "aws":
                provider = new Providers.AWS();
                break;
            
            case "gcp":
                provider = new Providers.Google();
                break;
        }

        // Run the corresponding command according to command name
        return await provider[command]();
    }
}