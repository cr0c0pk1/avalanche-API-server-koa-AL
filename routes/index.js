const Router = require('koa-router');

const blockController = require('../controllers/block');
const networkController = require('../controllers/network');

const router = new Router();

router
    .get('/blocks/hash/:hash', blockController.getBlockByHash)
    .get('/blocks/number/:blocknumber', blockController.getBlockByNumber)
    .get('/blocks/numbers/:blocknumber/:count', blockController.getXBlocksFromNthFromCChain)
    .get('/network', networkController.getNetWorkActivity);

module.exports = {
    routes () { return router.routes() }
};