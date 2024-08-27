import noblox from 'noblox.js';

import { env } from './env';
noblox
	.setCookie(env.ROBLOX_COOKIE, true)
	.then(() => {
		console.log(' Noblox is now ready!');
	})
	.catch((err) => {
		console.log('Noblox failed to login with this error: ' + err);
	});
export default noblox;
