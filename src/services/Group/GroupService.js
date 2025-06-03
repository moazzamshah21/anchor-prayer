import RestClient from '../RestClient';

const CreateGroup = payload => {
  return RestClient.Post('group/create', payload);
};

const FindMembersByPhoneNumber = payload => {
  return RestClient.Post('group/find-memeber-by-phonenumber', payload);
};

const LoginGroup = payload => {
  return RestClient.Post('group/login', payload);
};

const getAllGroupList = () => {
  return RestClient.Get('group/list');
};

const getGroupDetail = id => {
  return RestClient.Get(`group/detail/${id}`);
};

const JoinGroup = payload => {
  return RestClient.Post(`group/join`, payload);
};

const LikeGroup = payload => {
  return RestClient.Post(`group/like`, payload);
};

const DisLikeGroup = payload => {
  return RestClient.Post(`group/dislike`, payload);
};

const Approve = payload => {
  return RestClient.Post('group/approve-request', {
    groupId: payload.groupId,
    requesterId: payload.requesterId
  });
};

const MyGroups = () => {
  return RestClient.Get('group/all-joined-list');
};


export default {
  CreateGroup,
  FindMembersByPhoneNumber,
  LoginGroup,
  getAllGroupList,
  getGroupDetail,
  JoinGroup,
  LikeGroup,
  DisLikeGroup,
  Approve,
  MyGroups,
};
