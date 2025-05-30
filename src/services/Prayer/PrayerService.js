import RestClient from '../RestClient';

const AddPrayer = payload => {
  return RestClient.Post('prayer/add-pray', payload);
};

const UpdatePrayer = payload => {
  return RestClient.Post('prayer/update-pray', payload);
};

const ArchivePrayer = payload => {
  return RestClient.Post('prayer/archive-pray', payload);
};

const UnarchivePrayer = payload => {
  return RestClient.Post('prayer/unarchive-pray', payload);
};

const DeletePrayer = payload => {
  return RestClient.Post('prayer/delete-pray', payload);
};

const AnsweredPrayer = payload => {
  return RestClient.Post('prayer/answer-pray', payload);
};

const PlayAgainPrayer = payload => {
  return RestClient.Post('prayer/play-again-pray', payload);
};

const GetMyPrayers = (page = 1, limit = 10) => {
  return RestClient.Get(`prayer/get-my-prayers?page=${page}&limit=${limit}`);
};

const GetMyAnsweredPrayers = (page = 1, limit = 10) => {
  return RestClient.Get(`prayer/get-my-answered-prayers?page=${page}&limit=${limit}`);
};

const GetMyAchivedPrayers = (page = 1, limit = 10) => {
  return RestClient.Get(`prayer/get-my-archived-prayers?page=${page}&limit=${limit}`);
};

const GetPrayersByType = (type, page = 1, limit = 10) => {
  return RestClient.Get(
    `prayer/get-prayers-by-type?type=${type}&page=${page}&limit=${limit}`,
  );
};

const GetPrayersById = (id) => {
  return RestClient.Get(`prayer/get-prayer?id=${id}`);
};

const LikePrayer = payload => {
  return RestClient.Post('prayer/like', payload);
};

const DisLikePrayer = payload => {
  return RestClient.Post('prayer/dislike', payload);
};

const AddComment = payload => {
  return RestClient.Post('prayer/add-comment', payload);
};

export default {
  AddPrayer,
  UpdatePrayer,
  DeletePrayer,
  ArchivePrayer,
  UnarchivePrayer,
  AnsweredPrayer,
  PlayAgainPrayer,
  GetMyPrayers,
  GetMyAnsweredPrayers,
  GetMyAchivedPrayers,
  GetPrayersByType,
  GetPrayersById,
  LikePrayer,
  DisLikePrayer,
  AddComment,
};
