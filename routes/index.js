const Router = require('koa-router');

const blockController = require('../controllers/block');
const networkController = require('../controllers/network');
const addressController = require('../controllers/address');
const transactionController = require('../controllers/transaction');

const router = new Router();

router
    .get('/blocks/hash/:hash', blockController.getBlockByHash)
    .get('/blocks/number/:blocknumber', blockController.getBlockByNumber)
    .get('/blocks/numbers/:blocknumber/:count', blockController.getXBlocksFromNthFromCChain)
    .get('/network', networkController.getNetWorkActivity)
    .get('/address/hash/:hash', addressController.getAddressInfoByHash)
    .get('/transactions/hash/:hash', transactionController.getTransactionByHash)
    .get('/transactions/:address/:n/:x', transactionController.getXTransactionsAfterNthFromAddress)
    .get('/transactions/:n/:x', transactionController.getXPendingTransactionsAfterNth)
    .get('/transactions/recentpchain', transactionController.getRecentTransactionsFromPChain)
    .get('/transactions/recentxchain', transactionController.getRecentTransactionsFromXChain);

module.exports = {
    routes () { return router.routes() }
};