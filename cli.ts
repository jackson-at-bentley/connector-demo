import { readParcel } from './main.js';
import { FaceConnector, FaceRepository } from './main.js';

function cli(): void {
    const args = process.argv.slice(2);
    const path = args[0];

    if (!path) {
        console.log('usage: npm run add -- box');
        return;
    }

    const parcel = readParcel(path);

    if (parcel) {
        const elements = FaceConnector.synchronizeParcel(parcel);
        FaceRepository.writeElement('./elements.json', elements);
    }
}

cli();
