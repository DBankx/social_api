import { combineRoutes } from '@marblejs/http';
import signup$ from './effects/signup.effect';
import login$ from './effects/login.effect';


export default combineRoutes('/api/v1/auth', [signup$, login$]);