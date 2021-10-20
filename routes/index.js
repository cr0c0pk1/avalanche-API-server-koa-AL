const Router = require('koa-router');

const blockController = require('../controllers/block');
const networkController = require('../controllers/network');
const addressController = require('../controllers/address');

const router = new Router();

router
    .get('/blocks/hash/:hash', blockController.getBlockByHash)
    .get('/blocks/number/:blocknumber', blockController.getBlockByNumber)
    .get('/blocks/numbers/:blocknumber/:count', blockController.getXBlocksFromNthFromCChain)
    .get('/network', networkController.getNetWorkActivity)
    .get('/address/hash/:hash', addressController.getAddressInfoByHash);

module.exports = {
    routes () { return router.routes() }
};