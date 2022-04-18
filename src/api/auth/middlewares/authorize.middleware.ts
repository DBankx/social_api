import { VerifyOptions } from '@marblejs/middleware-jwt';
import { UserDao } from '../../user/helpers/user.dao';
import { mergeMap, switchMap } from 'rxjs/operators';
import { neverNullable } from '../../../utils/neverNullable.utils';
import { authorize$ as jwt$ } from '@marblejs/middleware-jwt';
import { HttpError, HttpStatus } from '@marblejs/http';
import { of, throwError } from 'rxjs';

const jwtConfig: VerifyOptions = ({ secret: process.env.JWT_SECRET! });

export const verifyPayload$ = (payload: any) => {
	return UserDao.findUserByUUID(payload.uuid).pipe(
		switchMap(user => {
			if (!user){
				return throwError(new HttpError('Please login', HttpStatus.UNAUTHORIZED))
			}
			return of(user);
		})	
	)
}

export const authorize$ = jwt$(jwtConfig, verifyPayload$);