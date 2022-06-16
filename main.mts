import { existsSync, readFileSync, writeFileSync } from 'node:fs';

class Vector
{
    i: number;
    j: number;
    k: number;

    constructor(i: number, j: number, k: number) {
        this.i = i;
        this.j = j;
        this.k = k;
    }

    static origin() {
        return new Vector(0, 0, 0);
    }

    add(other: Vector): Vector {
        return new Vector(this.i + other.i, this.j + other.j, this.k + other.k);
    }

    scale(scalar: number) : Vector {
        return new Vector(this.i * scalar, this.j * scalar, this.k * scalar);
    }

    get triple(): [number, number, number] {
        return [this.i, this.j, this.k];
    }
}

type Parcel = {
    length: number,
    width: number,
    height: number
}

export function readParcel(path: string): Parcel | null
{
    const parsed: any = JSON.parse(readFileSync(path, 'utf8'));

    const properties = [ 'length', 'width', 'height' ];

    for (const property of properties) {
        if (!(property in parsed && typeof parsed[property] == 'number')) {
            return null;
        }
    }

    return {
        length: parsed.length,
        width: parsed.width,
        height: parsed.height,
    };
}

type Face = [number, number, number][];

export class FaceConnector
{
    static toFace(
        firstBasis: Vector, firstScalar: number,
        secondBasis: Vector, secondScalar: number,
        offset: Vector = Vector.origin(),
    ): Face {
        const firstBasisScaled = offset.add(firstBasis).scale(firstScalar);
        const secondBasisScaled = offset.add(secondBasis).scale(secondScalar);

        return [
            offset.triple,
            firstBasisScaled.triple,
            secondBasisScaled.triple,
            firstBasisScaled.add(secondBasisScaled).triple,
        ];
    }

    static synchronizeParcel(parcel: Parcel): Face[] {
        const i = new Vector(1, 0, 0); // length basis
        const j = new Vector(0, 1, 0); // width basis
        const k = new Vector(0, 0, 1); // height basis

        return [
            FaceConnector.toFace(i, parcel.length, j, parcel.width),
            FaceConnector.toFace(i, parcel.length, j, parcel.width, k),
            FaceConnector.toFace(i, parcel.length, k, parcel.height),
            FaceConnector.toFace(i, parcel.length, k, parcel.height, j),
            FaceConnector.toFace(j, parcel.width, k, parcel.height),
            FaceConnector.toFace(j, parcel.width, k, parcel.height, i),
        ];
    }
}

export class FaceRepository
{
    static writeFaces(path: string, faces: Face[]): void {
        if (!existsSync(path)) {
            writeFileSync(
                path, JSON.stringify([]),
                {encoding: 'utf8', flag: 'wx'},
            );
        };

        const repository = JSON.parse(readFileSync(path, 'utf8'));

        if (Array.isArray(repository)) {
            repository.push(faces);

            writeFileSync(
                path, JSON.stringify(repository),
                {encoding: 'utf8', flag: 'w'},
            );
        }
    }
}
