import { r, HttpError, HttpStatus } from '@marblejs/http';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { neverNullable } from '../../../utils/neverNullable.utils';
import { TLoginDto } from '../dto/login.dto';
import { AuthDao } from '../helpers/auth.dao';
import loginValidator from '../validators/login.validator';
import generateTokenPayload from '../helpers/token.helper';
import { generateToken } from '@marblejs/middleware-jwt';
import makeApiResponse from '../../../utils/apiResponse.utils';
import { throwError } from 'rxjs';
import bcrypt from 'bcryptjs';

const login$ = r.pipe(
	r.matchPath('/login'),
	r.matchType('POST'),
	r.useEffect(req$ => req$.pipe(
		loginValidator,
		map(req => req.body as TLoginDto),
		mergeMap((loginCredentials: any) => AuthDao.findUserByEmail(loginCredentials.email).pipe(
			switchMap((user) => {
				// if user does not exist
				if(!user){
					return throwError(new HttpError('Invalid credentials', HttpStatus.UNAUTHORIZED));
				}

				// check if password is correct
				const isPasswordValid = bcrypt.compareSync(loginCredentials.password, user.password);

				//  if not throw error
				if(!isPasswordValid){
					return throwError(new HttpError('Invalid credentials', HttpStatus.UNAUTHORIZED));
				}

				// login successful
				return of(user) ;
			})
		)),
		map(generateTokenPayload),
		map(generateToken({ secret: process.env.JWT_SECRET!})),
		map(token => ({ body:  makeApiResponse('Login Successful', token , true )}))
	))
);


export default login$;