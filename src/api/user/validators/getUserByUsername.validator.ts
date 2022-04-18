import { requestValidator$, t } from '@marblejs/middleware-io';


export default requestValidator$({
	params: t.type({
		username: t.string,
	})
})