import { requestValidator$, t } from '@marblejs/middleware-io';


export default requestValidator$({
	params: t.type({
		id: t.string
	})
})