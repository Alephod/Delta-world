import { v4 as uuid } from 'uuid';
import express from 'express';
import context from 'request-context';
import { router } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(context.middleware('request'));
app.use((req, res, next) => {
    context.set('uuid', uuid());
    res.type('text/plain')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/api', router);

export default app;
