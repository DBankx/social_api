import { r } from '@marblejs/http';
import { map, mergeMap } from 'rxjs';
import makeApiResponse from '../../../utils/apiResponse.utils';
import { neverNullable } from '../../../utils/neverNullable.utils';
import { UserDao } from '../helpers/user.dao';


const getProfile$ = r.pipe(
	r.matchPath('/'),
	r.matchType('GET'),
	r.useEffect(req$ => req$.pipe(
		map(req => req.user.uuid),
		mergeMap(UserDao.findUserByUUID),
		mergeMap(neverNullable),
		map(user => ({body: makeApiResponse('Profile fetched', user, true)}))
	))
);

export default getProfile$;