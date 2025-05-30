import RestClient from '../RestClient';

const AddReminder = payload => {
  return RestClient.Post('reminder/add-reminder', payload);
};

const GetAllReminders = () => {
  return RestClient.Post('reminder/get-all-reminders');
};

export default {
  AddReminder,
  GetAllReminders,
};
