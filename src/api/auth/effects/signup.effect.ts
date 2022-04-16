import { r, RouteEffect, HttpError, HttpStatus } from '@marblejs/http';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthDao } from '../helpers/auth.dao';
import signupValidator from '../validators/signup.validator';
import makeApiResponse from '../../../utils/apiResponse.utils';
import bcrypt from 'bcryptjs';
import { throwError } from 'rxjs';

const signup$: RouteEffect = r.pipe(
	r.matchPath('/signup'),
	r.matchType('POST'),
	r.useEffect(req$ => req$.pipe(
		signupValidator,
		map(req => req.body),
		mergeMap((user: any) => {
			return AuthDao.findUserByEmail(user.email).pipe(
				switchMap((foundUser) => {
					if(foundUser){
						return throwError(new HttpError('User already exists', HttpStatus.BAD_REQUEST));
					} 
					const salt = bcrypt.genSaltSync(10);
					user.password = bcrypt.hashSync(user.password, salt);
					return AuthDao.createUser(user);
				})
			)
		}),
		map(body => ({body: makeApiResponse('User created successfully', null, true)})),
	))
)

export default signup$;