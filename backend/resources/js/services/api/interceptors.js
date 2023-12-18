export const interceptors = (api) => {
    api.interceptors.request.use(
        function (config) {

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // Обработка ответа сервера для всех заросов
    api.interceptors.response.use(
        async function (response) { // При положительном ответе сервера

            const responseData = response.data;

            return responseData;
        },
        async function (error) { // При ответе сервера с ошибкой
            
            return Promise.reject(error);
        }
    );
};
