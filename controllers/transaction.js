const dotenv = require('dotenv');

dotenv.config();

const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

exports.getTransactionByHash = async (cxt, next) => {
    let xChainTransaction;
    let cChainTransaction;
    let pChainTransaction;
    let returnData;

    xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(cxt.params.hash);
    cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(cxt.params.hash);
    pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(cxt.params.hash);

    if (xChainTransaction == 1 && cChainTransaction[0] == 1 && pChainTransaction == 1) {
        cxt.body = JSON.parse('{"result":"connection refused to avalanche client or api call rejected"}');
        await next();
    } else if (xChainTransaction != 1) {
        returnData = xChainTransaction;
        cxt.body = { returnData };
        await next();
    } else if (cChainTransaction[0] != 1) {
        returnData = cChainTransaction[1];
        cxt.body = { returnData };
        await next();
    } else if (pChainTransaction != 1) {
        returnData = pChainTransaction;
        cxt.body = { returnData };
        await next();
    }

};

exports.getXTransactionsAfterNthFromAddress = async (cxt, next) => {
    let xChainTransactions;
    let pChainTransactions;
    let cChainTransactions;
    let returnData;

    if ((cxt.params.address).charAt(0) == X_CHAIN) {
        xChainTransactions = await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(cxt.params.address, cxt.params.n, cxt.params.x);

        if (xChainTransactions[0] == 1) {
            returnData = xChainTransactions[1];
            cxt.body = { returnData };
            await next();
        } else {
            returnData = xChainTransactions[1];
            cxt.body = { returnData };
            await next();
        }
    } else if ((cxt.params.address).charAt(0) == P_CHAIN) {
        pChainTransactions = await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(cxt.params.address, cxt.params.n, cxt.params.x);
        
        if (pChainTransactions == 1) {
            cxt.body = JSON.parse('{"result":"api call rejected or not enough transactions"}');
        } else {
            returnData = pChainTransactions;
            cxt.body = { returnData };
            await next();
        }
    } else if ((cxt.params.address).slice(0, 2) == C_CHAIN) {
        cChainTransactions = await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(cxt.params.address, cxt.params.n, cxt.params.x);

        returnData = cChainTransactions;
        cxt.body = { returnData };
        await next();
    } else {
        cxt.body = JSON.parse('{"result":"wrong chain"}');
    }
};

exports.getXPendingTransactionsAfterNth = async (cxt, next) => {
    let returnData;

    if (cxt.params.n > 0 && cxt.params.x > 0) {
        cChainTransactions = await cChainMethods.getXPendingTransactionsAfterNthFromCChain(cxt.params.n, cxt.params.x);

        if (cChainTransactions[0] == 1) {
            returnData = cChainTransactions[1];
            cxt.body = { returnData };
            await next();
        } else {
            returnData = cChainTransactions[1];
            cxt.body = { returnData };
            await next();
        }
    } else {
        cxt.body = JSON.parse('{"result":"n and x < 0"}');
    }
};

exports.getRecentTransactionsFromXChain = async (cxt, next) => {
    let returnData;

    xChainTransaction = await xChainMethods.getRecentTransactions();

    if (xChainTransaction[0] == 1) {
        returnData = xChainTransaction[1];
        cxt.body = { returnData };
        await next();
    } else {
        returnData = xChainTransaction[1];
        cxt.body = { returnData };
        await next();
    }
};

exports.getRecentTransactionsFromPChain = async (cxt, next) => {
    let returnData;

    pChainTransaction = await pChainMethods.getRecentTransactions();

    if (pChainTransaction[0] == 1) {
        returnData = pChainTransaction[1];
        cxt.body = { returnData };
        await next();
    } else {
        returnData = pChainTransaction[1];
        cxt.body = { returnData };
        await next();
    }
};
