import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from '../styles/DonationStyle';
import BackHeader from '../components/BackHeader';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import PaymentService from '../services/Payment/PaymentService';
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get('window');

const DonationScreen = ({ navigation, route }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [email, setEmail] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onPressDonateNow = async () => {
    if (donationAmount == '') {
      showMessage({
        message: 'Please enter amount',
        type: 'danger',
      });
    } else if (email == '') {
      showMessage({
        message: 'Please enter email',
        type: 'danger',
      });
    } else {
      var payload = { amount: donationAmount, email: email };
      console.log(payload);
      const response = await PaymentService.GetPaymentIntent(payload);
      console.log(response);
      if (response.success) {
        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'ANCHOR',
          paymentIntentClientSecret: response.paymentIntent,
        });
        if (initResponse.error) {
          showMessage({
            message: initResponse.error.localizedMessage,
            type: 'danger',
          });
          return;
        }
        const paymentResponse = await presentPaymentSheet();
        if (paymentResponse.error) {
          showMessage({
            message: paymentResponse.error.localizedMessage,
            type: 'warning',
          });
          return;
        }
        const addPaymentResponse = await PaymentService.AddPayment({
          email: email,
          paymentId: response.paymentId,
          amount: donationAmount,
        });

        if (addPaymentResponse) {
          showMessage({
            message: addPaymentResponse?.message,
            type: 'success',
          });
          setDonationAmount('');
          setEmail('');
        } else {
          showMessage({
            message: 'Some thing went wrong!',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Some thing went wrong!',
          type: 'danger',
        });
      }
    }
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Donation" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.DonateUsText}>Donate Us</Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('10');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '10' ? 'green' : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('30');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '30' ? 'green' : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$30</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('50');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '50' ? 'green' : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$50</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('70');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '70' ? 'green' : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$70</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('90');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '90' ? 'green' : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$90</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDonationAmount('110');
                }}
                style={[
                  styles.DonatePriceView,
                  {
                    borderWidth: 1,
                    borderColor:
                      donationAmount == '110'
                        ? 'green'
                        : ThemeColors?.DARK_GRAY,
                  },
                ]}>
                <Text style={styles.DonatePriceText}>$110</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 50, paddingHorizontal: 40 }}>
            <View>
              <Text style={styles.GiftText}>Or, your best gift</Text>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderColor: ThemeColors?.DARK_GRAY,
                  borderWidth: 1,
                  paddingVertical: 15,
                  marginTop: 5,
                  fontSize: 18,
                  color: ThemeColors.BLACK,
                  fontFamily: ThemeFonts.REGULAR,
                  paddingHorizontal: 10,
                }}
                value={donationAmount}
                onChangeText={x => setDonationAmount(x)}
                keyboardType="number-pad"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.GiftText}>Email Address</Text>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderColor: ThemeColors?.DARK_GRAY,
                  borderWidth: 1,
                  paddingVertical: 15,
                  marginTop: 5,
                  fontSize: 18,
                  color: ThemeColors.BLACK,
                  fontFamily: ThemeFonts.REGULAR,
                  paddingHorizontal: 10,
                }}
                value={email}
                onChangeText={x => setEmail(x)}
              />
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                onPress={onPressDonateNow}
                style={styles.DonateNowBtn}>
                <Text style={styles.DonateNowBtnText}>Donate Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DonationListScreen');
                }}
                style={styles.DonateNowBtn2}>
                <Text style={styles.DonateNowBtnText2}>Donation history</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default DonationScreen;
