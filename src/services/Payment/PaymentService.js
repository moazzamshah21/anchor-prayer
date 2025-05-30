import RestClient from '../RestClient';

const GetPaymentIntent = payload => {
  return RestClient.Post('donation/payment-intent', payload);
};

const AddPayment = payload => {
  return RestClient.Post('donation/add-payment', payload);
};

const   GetAllDonattions = () => {
  return RestClient.Get('donation/get-all-donations');
};

export default {
  GetPaymentIntent,
  AddPayment,
  GetAllDonattions,
};
