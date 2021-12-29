import app from './app.js';
import { fileLogger } from './logger.js';

const port = '8080';
const host = '127.0.0.1';

app.listen(port, host, () => {
    const message = `Server started on http://${host}:${port}`;
    console.log(message);
    fileLogger.info(message);
});
