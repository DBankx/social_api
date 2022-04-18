import { r, RouteEffect } from '@marblejs/http';
import { User } from '@prisma/client';
import { map, mergeMap } from 'rxjs';
import { TCreatePostDto } from '../dto/createPost.dto';
import { PostDao } from '../helpers/post.dao';
import makeApiResponse from '../../../utils/apiResponse.utils';

interface IData {
	user: User,
	data: TCreatePostDto
}

const createPost$: RouteEffect = r.pipe(
	r.matchPath('/'),
	r.matchType('POST'),
	r.useEffect(req$ => req$.pipe(
		map((req) => ({user: req.user, data: req.body as TCreatePostDto})),
		mergeMap(({user, data} : IData) => PostDao.createPost({
			...data,
			userUuid: user.uuid,
		})),
		map(body => ({ body: makeApiResponse('Post created successfully', body, true)}))
	))
);


export default createPost$;