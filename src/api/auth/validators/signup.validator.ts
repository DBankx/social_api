import { requestValidator$ } from '@marblejs/middleware-io';
import { UserDto } from '../dto/signup.dto';

export default requestValidator$({
	body: UserDto
})