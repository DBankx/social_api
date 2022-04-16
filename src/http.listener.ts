import { httpListener } from '@marblejs/http';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';


const middlewares = [
	logger$(),
	bodyParser$(),
];

const effects: any[] = [];

export default httpListener({ middlewares, effects });