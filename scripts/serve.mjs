import { createLocalServer } from './local-server.mjs';

const server = createLocalServer(process.cwd());
server.listen(4173, '127.0.0.1', () => console.log('Yerel demo: http://127.0.0.1:4173'));
server.on('error', error => { console.error(error.code); process.exitCode = 1; });
