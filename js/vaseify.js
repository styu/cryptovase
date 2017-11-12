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
            coords: [1.5, 10.5],
            hashId: 5
        },
        neck2: {
            coords: [1.5, 11],
            hashId: 6
        },
        mouth1: {
            coords: [2.5, 13],
            hashId: 7
        },
        mouth2: {
            coords: [2.5, 13.5],
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
        var x = features[i].coords[0] + seed[features[i].hashId] + (offset-0.5)*3 + seed[8]*2;

        points.push([x, y])
        prevFeature = i;
    }

    return points
}
