import { HttpError, HttpStatus, r, RouteEffect } from '@marblejs/http';
import { map, mergeMap, of, switchMap, throwError } from 'rxjs';
import makeApiResponse from '../../../utils/apiResponse.utils';
import { UserDao } from '../helpers/user.dao';
import getUserByUsernameValidator from '../validators/getUserByUsername.validator';

const getUserByUsername$: RouteEffect = r.pipe(
	r.matchPath('/:username'),
	r.matchType('GET'),
	r.useEffect(req$ => req$.pipe(
		getUserByUsernameValidator,
		map((req: any) => req.params.username),
		mergeMap((uuid) => UserDao.findUserByUsername(uuid).pipe(
			switchMap(user => {
				if (!user) {
					return throwError(new HttpError('User not found', HttpStatus.NOT_FOUND))
				}
				return of(user);
			})
		)),
		map(user => ({body: makeApiResponse('User fetched', user, true)}))
	))
);

export default getUserByUsername$;