import { readParcel } from './main.mjs';
import { FaceConnector, FaceRepository } from './main.mjs';

function cli(): void {
    const args = process.argv.slice(2);
    const path = args[0];

    if (!path) {
        console.log('usage: npm run add -- box');
        return;
    }

    const parcel = readParcel(path);

    if (parcel) {
        const faces = FaceConnector.synchronizeParcel(parcel);
        FaceRepository.writeFaces('./faces.json', faces);
    }
}

cli();
