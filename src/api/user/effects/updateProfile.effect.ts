import { r } from '@marblejs/http';
import { map, mergeMap } from 'rxjs';
import updateProfileValidator from '../validators/updateProfile.validator';
import { User } from '@prisma/client';
import { UserDao } from '../helpers/user.dao';
import makeApiResponse from '../../../utils/apiResponse.utils';


const updateProfile$ = r.pipe(
	r.matchPath('/'),
	r.matchType('PUT'),
	r.useEffect(req$ => req$.pipe(
		updateProfileValidator,
		map(req => ({user: req.user, data: req.body})),
		mergeMap(({user, data}) => UserDao.updateUserByUUID(user.uuid, data)),
		map(body => ({body: makeApiResponse('Profile updated successfully', null, true)}))
	))
);


export default updateProfile$;