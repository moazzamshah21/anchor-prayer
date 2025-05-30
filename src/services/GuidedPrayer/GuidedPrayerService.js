import RestClient from '../RestClient';


const GetPrayersByType = (type, page = 1, limit = 10) => {
  return RestClient.Get(`guided-prayer/get-prayers-by-type?type=${type}&page=${page}&limit=${limit}`,);
};

const LikePrayer = payload => {
  return RestClient.Post('guided-prayer/like', payload);
};

const DisLikePrayer = payload => {
  return RestClient.Post('guided-prayer/dislike', payload);
};

const AddComment = payload => {
  return RestClient.Post('guided-prayer/add-comment', payload);
};

export default {
  GetPrayersByType,
  LikePrayer,
  DisLikePrayer,
  AddComment,
};
