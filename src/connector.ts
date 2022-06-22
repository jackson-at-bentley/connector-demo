import { BaseConnector } from '@itwin/connector-framework';

export default class FaceConnector extends BaseConnector
{
    static override async create(): Promise<BaseConnector> {
        return new FaceConnector();
    }

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
        throw new Error('Method not implemented.');
    }

    getApplicationVersion(): string {
        return '1';
    }

    getConnectorName(): string {
        return 'face-connector';
    }
}
