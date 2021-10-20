const Koa = require('koa');
const dotenv = require('dotenv');

const app = new Koa();
const { routes } = require('./routes');

dotenv.config();

app.use(routes());

app.listen(process.env.SERVER_PORT);