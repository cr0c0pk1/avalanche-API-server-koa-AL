const dotenv = require('dotenv');

const cChainMethods = require('../services/c-chain');

dotenv.config();

//get block by hash 
exports.getBlockByHash = async (ctx, next) => {
    const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(ctx.params.hash);
    let returnData;

    if (blockFromCChain[0] == 1) {
        returnData = blockFromCChain[1]
        ctx.body = { returnData };
        await next();
    } else {
        returnData = blockFromCChain[1]
        ctx.body = { returnData };
        await next();
    }
};


//get block by number 
exports.getBlockByNumber = async (ctx, next) => {
    const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(ctx.params.blocknumber);
    let returnData;

    if (cChainNumber[0] == 1) {
        returnData = cChainNumber[1];
        ctx.body = { returnData };
        await next();
    } else {
        returnData = cChainNumber[0];
        ctx.body = { returnData };
        await next();
    }
};


//GET X blocks after N-th
exports.getXBlocksFromNthFromCChain = async (ctx, next) => {
    const cChainArray = [];
    let k = 0;
    let returnData;

    const blockNumber = ctx.params.blocknumber;
    const count = ctx.params.count;

    for (let i = blockNumber - count; i < blockNumber; ++i)
    {
        let hashValue = await cChainMethods.getBlockByNumberFromCChain(i);
        
        if (hashValue[0] == 1) {
            returnData = hashValue[1];
            return ctx.body = { returnData };
        } else {
            cChainArray[k] = hashValue[1];
            k++;
        }
    }

    returnData = cChainArray;
    ctx.body = { returnData };
    await next();
};


