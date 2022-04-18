import { PrismaClient } from '@prisma/client';
import { from } from 'rxjs';
import { TUpdateProfileDto } from '../dto/updateProfile.dto';

const prisma = new PrismaClient();

export namespace UserDao {
	export const findUserByUUID = (uuid: string) => from(
		prisma.user.findUnique({
			where: {
				uuid
			},
			select: {
				uuid: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
				username: true,
				avatar: true,
				emailConfirmed: true
			}
		})
	)

	export const findUserByUsername = (username: string) => from(
		prisma.user.findUnique({
			where: {
				username
			},
			select: {
				uuid: true,
				name: true,
				createdAt: true,
				updatedAt: true,
				username: true,
				avatar: true,
			}
		})
	)

	export const updateUserByUUID = (uuid: string, data: TUpdateProfileDto) => from(
		prisma.user.update({
			where: {
				uuid
			},
			data
		})
	)
}