import { BaseConnector } from '@itwin/connector-framework';

export class FaceConnector extends BaseConnector
{
    initializeJob(): Promise<void> {
        return Promise.resolve(undefined);
    }

    openSourceData(source: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    importDefinitions(): Promise<void> {
        return Promise.resolve(undefined);
    }

    importDynamicSchema(requestContext?: string | undefined): Promise<void> {
        return Promise.resolve(undefined);
    }

    importDomainSchema(requestContext?: string | undefined): Promise<void> {
        return Promise.resolve(undefined);
    }

    updateExistingData(): Promise<void> {
        return Promise.resolve(undefined);
    }

    getApplicationId(): string {
        return 'face-application';
    }

    getApplicationVersion(): string {
        return '1';
    }

    getConnectorName(): string {
        return 'face-connector';
    }
}