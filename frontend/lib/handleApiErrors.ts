import { HTTPError } from '@aspida/fetch';
import { redirect } from 'next/navigation';

export const handleApiErrors = (error: HTTPError) => {
	if (error.response.status === 401) return redirect('/sign_in');
	// switch (error.response.status) {
	// 	case 401:
	// 		return redirect('/sign_in');
	// 	default:
	// 		console.error(error.response);
	// 		// 500ページを描画
	// 		break;
	// }

	throw error;
};
