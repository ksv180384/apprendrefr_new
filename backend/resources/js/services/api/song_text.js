import { get } from '@/services/api/query';
import { objToUrlParams } from '@/helpers/helper';

const search = async (params) => {
  const paramPage = objToUrlParams(params);

  return await get(`/song/search${paramPage}`);
}

const  searchByArtistTitle = async (params) => {
  const paramPage = objToUrlParams(params);

  return await get(`/song/search-by-artist-and-title${paramPage}`);
}


export default {
  search,
  searchByArtistTitle,
};
