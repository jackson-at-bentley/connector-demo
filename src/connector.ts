const { BaseConnector } = require('@itwin/connector-framework');

export default class FaceConnector extends BaseConnector
{
    public static override async create(): Promise<FaceConnector> {
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
        return 'face-application';
    }

    getApplicationVersion(): string {
        return '1';
    }

    getConnectorName(): string {
        return 'face-connector';
    }
}
