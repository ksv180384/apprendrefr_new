
export const config = {
    path: 'http://apprendrefr.local/',
    //path: 'http://apprendrefr.ru/',
    headerAuthorizationToken: () => {
        const lut = localStorage.getItem('user-token-page');
        const user_token = typeof lut !== 'undefined' && lut !== null ? lut : '';
        return {
            'Authorization': localStorage.getItem('user-token'),
            'App-User-Token': user_token,
            'Accept': 'application/json',
        };
    }
};