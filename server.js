const Koa = require('koa');
const dotenv = require('dotenv');

const app = new Koa();
const { routes } = require('./routes');
const err = require('./helpers/error');

dotenv.config();

app.use(err);
app.use(routes());

app.listen(process.env.SERVER_PORT);