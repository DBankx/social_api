import { t } from '@marblejs/middleware-io';


export const CreatePostDto = t.type({
	title: t.string,
	body: t.string,
	userUuid: t.string,
})


export type TCreatePostDto = t.TypeOf<typeof CreatePostDto>
