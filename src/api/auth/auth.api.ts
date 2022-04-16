import { combineRoutes } from '@marblejs/http';
import signup$ from './effects/signup.effect';


export default combineRoutes('/api/v1/auth', [signup$]);