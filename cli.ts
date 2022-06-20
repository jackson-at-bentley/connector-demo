import { parse } from 'node:path';

import { readParcel, synchronizeParcel } from './main.js';
import { FaceRepository } from './main.js';
import { FaceConnector } from './connector.js';

import { ConnectorRunner, JobArgs } from '@itwin/connector-framework';
import { IModelHost, IModelHostConfiguration } from '@itwin/core-backend';

async function cli(): Promise<void> {
    const args = process.argv.slice(2);
    const path = args[0];
    const context = process.argv[1];

    const directory = parse(context).dir;

    const configuration = new IModelHostConfiguration();
    configuration.cacheDir = directory;
    await IModelHost.startup(configuration);

    const jobArgs = new JobArgs({
      source: 'unit.json',
      stagingDir: directory,
      dbType: 'snapshot',
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
