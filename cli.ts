import { readParcel, synchronizeParcel } from './main.js';
import { FaceRepository } from './main.js';
import { FaceConnector } from './connector.js';

import { ConnectorRunner } from '@itwin/connector-framework';
import { IModelHost, IModelHostConfiguration } from '@itwin/core-backend';

// TODO: Package must export JobArgs type.
import { JobArgs } from './node_modules/@itwin/connector-framework/lib/Args.js';

async function cli(): Promise<void> {
    const args = process.argv.slice(2);
    const path = args[0];

    const directory = '/home/jackson/bentley/connector-demo';

    const configuration = new IModelHostConfiguration();
    configuration.appAssetsDir = directory;
    await IModelHost.startup(configuration);

    const jobArgs = new JobArgs({
      source: 'unit.json',
      stagingDir: directory,
      dbType: 'standalone',
    });

    const runner = new ConnectorRunner(jobArgs);
    runner.run(new FaceConnector());

    if (!path) {
        console.log('usage: npm run add -- box');
        return;
    }

    const parcel = readParcel(path);

    if (parcel) {
        const elements = synchronizeParcel(parcel);
        FaceRepository.writeElement('./elements.json', elements);
    }
}

cli();
