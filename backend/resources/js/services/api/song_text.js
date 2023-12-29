import { get } from '@/services/api/query';
import { objToUrlParams } from '@/helpers/helper';

const songText = {
  async searchByArtistTitle(params)  {
    const paramPage = objToUrlParams(params);

    return await get(`/song/search-by-artist-and-title${paramPage}`);
  }
}

export default songText;
