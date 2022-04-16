export default function makeApiResponse(message: string, data: any, success: boolean) {
	return {
			message,
			data,
			success
	};
}