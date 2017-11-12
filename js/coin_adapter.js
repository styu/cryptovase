// Using the API from https://www.smartbit.com.au/api

// Gets the block from the blockchain at height blockNum and calls callback with the relevant data
// Data consists of:
// success - whether or not the block was successfully retrieved
// merkleroot - the big momma hash of all the transactitons
// nonce - the random number that gets 'mined'
// hash - the has of the current block, constructed from all the other data returned
// previous_block_hash - hash of the previous block
var getBlock = function (blockNum, callback) {
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
var remineBlock = function (blockData) {
    var difficulty = 4;
    var matches = -1;
    var hash = 0;
    var hashHex = "";

    var tries = 0;

    while (matches < difficulty) {
        tries += 1;

        if (tries % 100 == 0) {
            console.log(tries);
        }

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
        //console.log("Attempting to match")
        //console.log(hashHex);
        //console.log(blockData.hash);
    
        matches = 0;
        for (var i in hashHex) {
            if (hashHex[i] == blockData.hash[i]) {
                matches += 1;
            }
        }
    }
    
    console.log("Got " + matches + " matches");
    console.log(blockData.hash);
    console.log(hashHex);
}

var convertNonceToVase = function (nonce) {
    var seed = [0, 0, 0, 0, 0, 0, 0, 0, 0];

}

//getBlock(500, remineBlock);