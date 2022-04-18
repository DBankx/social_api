import { PrismaClient } from '@prisma/client';
import { from } from 'rxjs';
import { TCreatePostDto } from '../dto/createPost.dto';

const prisma = new PrismaClient();

export namespace PostDao{
	export const createPost = (post: TCreatePostDto) => from(
		prisma.post.create({
			data: {
				title: post.title,
				body: post.body,
				user: {
					connect: {
						uuid: post.userUuid
					}
				}
			},

		})
	)

	export const getPostByUuid = (uuid: string) => from(
		prisma.post.findUnique({
			where: {
				uuid
			}
		})
	)
}