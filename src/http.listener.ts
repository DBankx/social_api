import { httpListener } from '@marblejs/http';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';
import authAPI$ from './api/auth/auth.api';

const middlewares = [
	logger$(),
	bodyParser$(),
];

const effects = [
authAPI$
];

export default httpListener({ middlewares, effects });