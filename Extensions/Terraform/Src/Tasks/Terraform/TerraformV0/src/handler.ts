import * as Providers from "./providers";
import {Terraform} from "./terraform";

export class Handler {
    public async execute(providerName: string, command: string): Promise<number> {

        let provider: Providers.Provider;

        switch (providerName) {
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

        let terraform: Terraform = new Terraform([provider],backend);

        return await terraform[command]();
    }
}