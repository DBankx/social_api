import { requestValidator$ } from '@marblejs/middleware-io';
import { LoginDto } from '../dto/login.dto';

export default requestValidator$({
	body: LoginDto
})