import { t } from '@marblejs/middleware-io';
import { optional } from '../../../utils/optional.utils';

export const UpdateProfileDto = t.type({
	username: optional(t.string),
	avatar: optional(t.string),
	name: optional(t.string)
})

export type TUpdateProfileDto = t.TypeOf<typeof UpdateProfileDto>