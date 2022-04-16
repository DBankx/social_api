import { PrismaClient } from '@prisma/client';
import { from } from 'rxjs';
import { TUserDto } from '../dto/signup.dto';

const prisma = new PrismaClient();

export namespace AuthDao {
	export const findUserByEmail = (email: string) => from (
		prisma.user.findUnique({
			where: {
				email
			}
		})
	)
	export const createUser = (user: TUserDto) => from(
		prisma.user.create({
			data: user
		})
	) 
}