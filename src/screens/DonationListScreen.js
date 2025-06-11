import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import styles from '../styles/DonationListStyle';
import BackHeader from '../components/BackHeader';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import {useStripe, CardField} from '@stripe/stripe-react-native';
import PaymentService from '../services/Payment/PaymentService';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');

const DonationListScreen = ({navigation, route}) => {
  const [donationList, setDonationList] = useState([]);

  const onLoadDonations = async () => {
    var response = await PaymentService.GetAllDonattions();
    //'response', response);
    if (response?.success) {
      setDonationList(response?.data);
    } else {
      setDonationList([]);
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    onLoadDonations();
  }, []);

  const donationListRenderItem = ({item, index}) => {
    const date = new Date(item?.createAt);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    return (
      <View style={styles.ReminderListMainView}>
        <View style={{width: '45%'}}>
          <Text numberOfLines={1} style={styles.ReminderNameText}>
            ${item?.amount}
          </Text>
        </View>
        <Text style={[styles.ReminderNameText2, {textAlign: 'right'}]}>
          {formattedDate}
        </Text>
      </View>
    );
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Donation List" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.NodataFoundText}>No data found</Text>
                </View>
              );
            }}
            data={donationList}
            renderItem={donationListRenderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginTop: 20}}
          />
        </View>

      </ScrollView>
    </React.Fragment>
  );
};

export default DonationListScreen;
