import { requestValidator$ } from '@marblejs/middleware-io';
import { UpdateProfileDto } from '../dto/updateProfile.dto';

export default requestValidator$({
	body: UpdateProfileDto
})