import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import styles from '../styles/ConfirmPrayStyle';
import HeaderBlack from '../components/HeaderBlack';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import Button from '../components/Button';
import PrayerService from '../services/Prayer/PrayerService';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import * as commonAction from '../actions/Common/CommonAction';
const { width } = Dimensions.get('window');

const ConfirmPrayScreen = ({ navigation, route }) => {

  const { data } = route?.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressNextBtn = async () => {
    var payload = {
      title: data?.title,
      description: data?.desc,
      imageBase64: data?.imagebase64,
    };
    var response = await PrayerService.AddPrayer(payload);
    if (response?.success) {
      setModalVisible(true);
      dispatch(commonAction.fetchMyPrayers());
      showMessage({
        message: response?.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <React.Fragment>
      <HeaderBlack lessThenIcon Name={'Confirm Pray'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{ marginTop: 50 }}>
            <TextInput
              placeholder="Enter prayer title..."
              placeholderTextColor={'#707070'}
              style={{
                paddingHorizontal: 40,
                fontSize: 25,
                fontFamily: ThemeFonts?.REGULAR,
                color: ThemeColors?.BLACK,
              }}
              value={data?.title}
              editable={false}
            />
            <View style={styles.DividerView} />



            {data?.image != null && (
              <View style={styles.contentContainerStyle}>
                <Text style={styles.ImagesText}>IMAGE</Text>
                <View
                  style={{
                    marginTop: 20,
                  }}>
                  <Image
                    source={{ uri: data?.image }}
                    style={{
                      width: width - 50,
                      height: width / 2 + 50,
                      borderRadius: 5,
                      alignSelf: 'center',
                      marginTop: -10,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.DividerView} />
              </View>
            )}


            <View style={styles.contentContainerStyle}>
              <Text
                style={[styles.ImagesText, { marginVertical: 0, marginTop: 15 }]}>
                DESCRIPTION
              </Text>
              <TextInput
                placeholder="Add a description to this prayer...
You can even use hashtags: #family#pray
etc."
                placeholderTextColor={'#707070'}
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts?.REGULAR,
                  height: 80,
                  marginLeft: -5,
                  color: ThemeColors?.BLACK,
                }}
                value={data?.desc}
                editable={false}
              />
            </View>
            <View style={styles.DividerView} />
            <View style={styles.centeredViewSimple}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('../../assets/images/backButton.png')}
                  style={{
                    width: 83,
                    height: 83,
                    marginTop: 20,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onPressNextBtn();
                }}>
                <Image
                  source={require('../../assets/images/nextButton.png')}
                  style={{
                    width: 83,
                    height: 83,
                    marginTop: 20,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/images/blackhand.png')}
              style={{ width: 90, height: 70 }}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/verified.png')}
              style={{ width: 22, height: 22, marginTop: -20, marginLeft: 65 }}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.ModalTextStyle}>
                Yahoo! You have successfully{'\n'}Added the prayer!
              </Text>
              <View style={{ marginTop: 20 }}>
                <Button
                  title={`Continue`}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Home', {
                      name: '',
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmPrayScreen;
