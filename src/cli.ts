import { join, parse } from 'node:path';

import { readParcel, synchronizeParcel } from './main.js';
import { FaceRepository } from './main.js';

import { ConnectorRunner } from '@itwin/connector-framework';
import { IModelHost, IModelHostConfiguration } from '@itwin/core-backend';

import { JobArgs } from '../node_modules/@itwin/connector-framework/lib/Args.js';

async function cli(): Promise<void> {
    const args = process.argv.slice(2);
    const path = args[0];
    const root = parse(process.argv[1]);

    const configuration = new IModelHostConfiguration();
    configuration.cacheDir = root.dir;
    await IModelHost.startup(configuration);

    const jobArgs = new JobArgs({
      source: 'unit.json',
      stagingDir: root.dir,
      dbType: 'snapshot',
    });

    const runner = new ConnectorRunner(jobArgs);
    runner.run(join(root.dir, 'connector.js'));

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
