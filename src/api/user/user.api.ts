import { combineRoutes } from '@marblejs/http';
import { authorize$ } from '../auth/middlewares/authorize.middleware';
import getProfile$ from './effects/getProfile.effect';
import getUserByUsername$ from './effects/getUserByUsername.effect';
import updateProfile$ from './effects/updateProfile.effect';

export default combineRoutes('/api/v1/user', {
	effects: [getProfile$, getUserByUsername$, updateProfile$],
	middlewares: [authorize$],
});