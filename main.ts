import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export class Vector
{
    i: number;
    j: number;
    k: number;

    constructor(i: number, j: number, k: number) {
        this.i = i;
        this.j = j;
        this.k = k;
    }

    static zero() {
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
    height: number,
    [index: string]: unknown,
}

export function readParcel(path: string): Parcel | null
{
    const parsed: any = JSON.parse(readFileSync(path, 'utf8'));

    const required = [ 'length', 'width', 'height' ];

    for (const property of required) {
        if (property in required && typeof parsed[property] !== 'number') {
            return null;
        }
    }

    let parcel: Parcel = { length: parsed.length, width: parsed.width, height: parsed.height };

    for (const property of Object.keys(parsed)) {
        if (!required.includes(property)) {
            parcel[property] = parsed[property];
        }
    }

    return parcel;
}

type Face = [number, number, number][];

export class FaceConnector
{
    static toFace(
        firstBasis: Vector, firstScalar: number,
        secondBasis: Vector, secondScalar: number,
        offset: Vector = Vector.zero(),
    ): Face {
        const firstBasisScaled = firstBasis.scale(firstScalar);
        const secondBasisScaled = secondBasis.scale(secondScalar);

        return [
            Vector.zero(),
            firstBasisScaled,
            secondBasisScaled,
            firstBasisScaled.add(secondBasisScaled),
        ].map((vector) => vector.add(offset).triple);
    }

    static synchronizeParcel(parcel: Parcel): Element {
        const i = new Vector(1, 0, 0); // length basis
        const j = new Vector(0, 1, 0); // width basis
        const k = new Vector(0, 0, 1); // height basis

        let color = Object.keys(parcel).includes('color') && (typeof parcel.color == 'string')
                  ? parcel.color : undefined;

        let opacity = Object.keys(parcel).includes('opacity') && (typeof parcel.opacity == 'number')
                  ? parcel.opacity : undefined;

        const element: Element = { faces: [
            FaceConnector.toFace(i, parcel.length, j, parcel.width),
            FaceConnector.toFace(i, parcel.length, j, parcel.width,
                k.scale(parcel.height)),
            FaceConnector.toFace(i, parcel.length, k, parcel.height),
            FaceConnector.toFace(i, parcel.length, k, parcel.height,
                j.scale(parcel.width)),
            FaceConnector.toFace(j, parcel.width, k, parcel.height),
            FaceConnector.toFace(j, parcel.width, k, parcel.height,
                i.scale(parcel.length)),
        ]};

        if (color) { element.color = color; }
        if (opacity) { element.opacity = opacity; }

        return element;
    }
}

type Element = {
    faces: Face[],
    color?: string,
    opacity?: number,
}

export class FaceRepository
{
    static writeElement(path: string, element: Element): void {
        if (!existsSync(path)) {
            writeFileSync(
                path, JSON.stringify([]),
                {encoding: 'utf8', flag: 'wx'},
            );
        };

        const repository = JSON.parse(readFileSync(path, 'utf8'));

        if (Array.isArray(repository)) {
            repository.push(element);

            writeFileSync(
                path, JSON.stringify(repository),
                {encoding: 'utf8', flag: 'w'},
            );
        }
    }
}
