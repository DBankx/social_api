import { HttpError, r, HttpStatus } from '@marblejs/http';
import { map, mergeMap, of, switchMap, throwError } from 'rxjs';
import makeApiResponse from '../../../utils/apiResponse.utils';
import { PostDao } from '../helpers/post.dao';
import validateRequest$ from '../validators/getPostById.validator';

const getPostById$ = r.pipe(
	r.matchPath('/:id'),
	r.matchType('GET'),
	r.useEffect(req$ => req$.pipe(
		validateRequest$,
		map(req => req.params.id),
		mergeMap(uuid => PostDao.getPostByUuid(uuid).pipe(
			switchMap(post => post ? of(post) : throwError(new HttpError('Post not found', HttpStatus.NOT_FOUND)))
		)),
		map(post => ({ body: makeApiResponse('Post found successfully', post, true)}))
	))
);


export default getPostById$;