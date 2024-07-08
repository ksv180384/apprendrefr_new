import { get } from '@/services/api/query';
// import { objToUrlParams } from '@/helpers/helper';

const getWordsLearningWrite = async () => {
  return await get(`/word/learning-write`);
}

export default {
  getWordsLearningWrite,
};
