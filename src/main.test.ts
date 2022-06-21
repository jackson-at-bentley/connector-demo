const { toFace, Vector } = require('./main.js');

test('rectangular face from orthogonal pair', () => {
    const firstBasis = new Vector(1, 0, 0);
    const secondBasis = new Vector(0, 1, 0);
    const actual = toFace(firstBasis, 4, secondBasis, 2);
    expect(actual).toStrictEqual([[0, 0, 0], [4, 0, 0], [0, 2, 0], [4, 2, 0]]);
});

test('rectangular face from orthogonal pair with offset', () => {
    const firstBasis = new Vector(1, 0, 0);
    const secondBasis = new Vector(0, 1, 0);
    const offset = new Vector(0, 0, 1);
    const actual = toFace(firstBasis, 4, secondBasis, 2, offset);
    expect(actual).toStrictEqual([[0, 0, 1], [4, 0, 1], [0, 2, 1], [4, 2, 1]]);
});
