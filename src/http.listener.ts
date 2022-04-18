import { httpListener } from '@marblejs/http';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';
import authAPI$ from './api/auth/auth.api';
import userAPI$ from './api/user/user.api';
import postAPI$ from './api/post/post.api';

const middlewares = [
	logger$(),
	bodyParser$(),
];

const effects = [
authAPI$,
userAPI$,
postAPI$,
];

export default httpListener({ middlewares, effects });