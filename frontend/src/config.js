const lut = localStorage.getItem('user-token-page');
const user_token = typeof lut !== 'undefined' && lut !== null ? lut : '';


export const config = {
    path: 'http://apprendrefr-new2.local/',
    UserToken: user_token,
};
