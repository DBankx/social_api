
import { combineRoutes } from '@marblejs/http';
import { authorize$ } from '../auth/middlewares/authorize.middleware';
import createPost$ from './effects/createPost.effect';
import getPostById$ from './effects/getPostById.effect';

export default combineRoutes('/api/v1/posts', {
	effects: [createPost$, getPostById$],
	middlewares: [authorize$],
})