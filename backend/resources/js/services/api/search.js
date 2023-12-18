import { get } from '@/services/api/query';
import { objToUrlParams } from '@/helpers/helper';

export const search = async (params) => {
    const paramPage = objToUrlParams(params);

    return await get(`search${paramPage}`);
}
