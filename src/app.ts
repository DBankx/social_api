import { createServer } from '@marblejs/http';
import { IO } from 'fp-ts/lib/IO';
import httpListener from './http.listener';


const server = createServer({
	port: 3000,
	hostname: 'localhost',
	listener: httpListener
})

const app: IO<void> = async () => await (await server)();

app();