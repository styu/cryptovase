getVaseParams = function (seed) {
    var seed = seed || [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
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
            hashId: 2
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
    for (i in features) {
        var heightVariance = 0;
        if (prevFeature) {
            // get difference between features
            heightTolerance = features[i].coords[1] - features[prevFeature].coords[1];
            console.log(heightTolerance);
            heightVariance = heightTolerance*Math.random()/2
        }
        points.push([features[i].coords[0] + seed[features[i].hashId], features[i].coords[1] - heightVariance ])
        prevFeature = i;
    }

    return points
}

// takes list of points and generates them
drawVase = function (seed) {

    var params = getVaseParams(seed);
    var scale = 30;
    
    var c2 = document.getElementById('c').getContext('2d');
    c2.fillStyle = '#f00';
    c2.beginPath();
    c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (i in params) {
        vertex = params[i]
        c2.lineTo(vertex[0]*scale, (13.5-vertex[1])*scale);
    }
    c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
}

$(function () {
    // hash = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    hash = undefined;
    drawVase(hash);
});
