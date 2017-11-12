export const getVaseParams = function (seed) {
    var seed = seed || [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    var features = {
        foot1: {
            coords: [2, 0],
            hashId: 0,
        },
        foot2: {
            coords: [1.5, 1],
            hashId: 0
        },
        foot3: {
            coords: [1.5, 1.5],
            hashId: 0
        },
        body1: {
            coords: [2.5, 3],
            hashId: 1
        },
        body2: {
            coords: [3, 6],
            hashId: 2,
            multiplierHash: 8
        },
        body3: {
            coords: [2.7, 8],
            hashId: 3
        },
        shoulder1: {
            coords: [1.5, 10],
            hashId: 4
        },
        neck1: {
            coords: [1, 10.5],
            hashId: 5
        },
        neck2: {
            coords: [1, 11],
            hashId: 6
        },
        mouth1: {
            coords: [1.5, 12],
            hashId: 7
        },
        mouth2: {
            coords: [1.5, 12.3],
            hashId: 7
        }
    }

    var points = [];
    var prevFeature;

    for (let i in features) {
        var heightVariance = 0;
        if (prevFeature) {
            // get difference between features
            let heightTolerance = features[i].coords[1] - features[prevFeature].coords[1];
            console.log(heightTolerance);
            heightVariance = heightTolerance * Math.random() / 2
        }

        if (features[i].multiplierHash !== undefined) {
            var offset = seed[features[i].multiplierHash];
        } else {
            var offset = 0.5;

        }
        var y = features[i].coords[1] - heightVariance
        var x = features[i].coords[0] + seed[features[i].hashId] + (offset - 0.5) * 3 + seed[8] * seed[8];

        points.push([x, y])

        prevFeature = i;
    }

    var innerShell = []
    for (let i in points) {
        let x = points[points.length - i - 1][0] - 0.3;
        let y = points[points.length - i - 1][1]
        if (i == points.length - 1) {
            innerShell.push([x-0.5, y+0.5])
            innerShell.push([0, y+0.5])
            innerShell.push([0, y])
            innerShell.push(points[0])
        } else {
            innerShell.push([x, y])
        }
    }

    points = points.concat(innerShell);

    return points
}
