import { drawVase } from "./vase.demo.js";
// Using the API from https://www.smartbit.com.au/api

// Gets the block from the blockchain at height blockNum and calls callback with the relevant data
// Data consists of:
// success - whether or not the block was successfully retrieved
// merkleroot - the big momma hash of all the transactitons
// nonce - the random number that gets 'mined'
// hash - the has of the current block, constructed from all the other data returned
// previous_block_hash - hash of the previous block
export const getBlock = function (blockNum, callback) {
    $.ajax({
        url: "https://api.smartbit.com.au/v1/blockchain/block/"+blockNum,
        dataType: "json"
    }).done(function (data) {
        if (data && data.success) {
            console.log(blockNum + " get!");
            var ret = {
                success: true,
                nonce: data.block.nonce,
                merkleroot: data.block.merkleroot,
                hash: data.block.hash,
                previous_block_hash: data.block.previous_block_hash
            };
            callback(ret);
        } else {
            console.log(blockNum + " failed");
            var ret = {success: false};
            callback(ret);
        }
    });
}

var hex2uint8 = function (hexString) {
    var bytes = new Uint8Array(hexString.length / 2);

    for(var i = 0; i < hexString.length-1; i+=2) {
        bytes[i/2] = parseInt(hexString.substr(i, 2), 16);
    }

    return bytes;
}

// Attempts to remine a block. Note that it doesn't use the
// full bitcoin header to hash.
export const remineBlock = function (blockData) {
    var difficulty = 14;
    var matches = -1;
    var hash = 0;
    var hashHex = "";
    var bestMatch = -1;
    var newNonce;

    var tries = 0;
    var numTriesBox = $('#numTries');

    $('#origHash').text(blockData.hash);

    var g = setInterval(function() {
        var subTries = 0;
        while (subTries < 937) {
            subTries += 1;
            tries += 1;
            
            hash = sha256.create();
            
            hash.update(hex2uint8(blockData.previous_block_hash));
            hash.update(hex2uint8(blockData.merkleroot));
        
            newNonce = new Uint8Array(4);
            newNonce[0] = Math.random() * 256;
            newNonce[1] = Math.random() * 256;
            newNonce[2] = Math.random() * 256;
            newNonce[3] = Math.random() * 256;
        
            hash.update(newNonce);
        
            hashHex = hash.hex();
        
            matches = 0;
            for (var i in hashHex) {
                if (hashHex[i] == blockData.hash[i]) {
                    matches += 1;
                }
            }
            if (matches >= difficulty) {
                if (matches >= bestMatch) {
                    bestMatch = matches;
                    $('#bestMatch').text(matches/1.28 + '%');
                }
                
                $('#bestHash').text(hashHex);
                var matchText = ""
                for (var i in hashHex) {
                    if (hashHex[i] == blockData.hash[i]) {
                        matchText += hashHex[i];
                    } else {
                        matchText += ".";
                    }
                }
                $('#matchHash').text(matchText);
                convertNonceToVase(newNonce, blockData);
            }
            if (tries % 7 == 0)
            {
                numTriesBox.text(tries);
            }
        }
        if (matches >= 25) {
            numTriesBox.text(tries);
            clearInterval(g);
        }
    }, 1);
}

var convertNonceToVase = function (newNonce, blockData) {
    var seed = new Array();
    for (var i in newNonce) {
        seed.push((newNonce[i]%16)/16.0);
        seed.push(((newNonce[i]/16)%16)/16.0);
    }
    for (var i in blockData.hash) {
        seed.push(parseInt(blockData.hash[blockData.hash.length - 1 - i], 16)/16.0);
    }
    drawVase(seed);
}

//getBlock(500, remineBlock);