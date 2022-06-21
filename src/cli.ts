const { join, parse } = require('node:path');

const { readParcel, synchronizeParcel } = require('./main.js');
const { FaceRepository } = require('./main.js');

const { ConnectorRunner } = require('@itwin/connector-framework');
const { IModelHost, IModelHostConfiguration } = require('@itwin/core-backend');

// TODO: Export the `JobArgs` type.
const { JobArgs } = require('../node_modules/@itwin/connector-framework/lib/Args.js');

async function cli(): Promise<void> {
    const args = process.argv.slice(2);
    const path = args[0];
    const context = process.argv[1];

    const directory = parse(context);

    const configuration = new IModelHostConfiguration();
    configuration.cacheDir = directory.dir;
    await IModelHost.startup(configuration);

    const jobArgs = new JobArgs({
      source: 'unit.json',
      stagingDir: directory.dir,
      dbType: 'snapshot',
    });

    const runner = new ConnectorRunner(jobArgs);
    const connector = join(directory.dir, 'connector.js');
    console.log(connector);
    runner.run(connector);

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
