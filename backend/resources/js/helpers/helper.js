/**
 * Формируем строку get параметров из объекта
 * @param params
 * @returns {string}
 */
export const objToUrlParams = (params) => {
    if(!params || !Object.keys(params).length){
        return '';
    }
    const p = {};
    Object.keys(params).forEach(item => {
        // Если значение параметра является массивом, то формируем объект вида { 'key[0]': val, 'key[1]': val2 }
        if(Array.isArray(params[item])){
            for (const arrKey in params[item]){
                p[`${item}[${arrKey}]`] = `${params[item][arrKey]}`;
            }
        } else {
            p[item] = params[item];
        }
    });
    return '?' + new URLSearchParams(p).toString();
}
