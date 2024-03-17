import { post } from '@/services/api/query';
import { objToUrlParams } from '@/helpers/helper';

export const search = async (params) => {
    return await post(`search`, params);
}
