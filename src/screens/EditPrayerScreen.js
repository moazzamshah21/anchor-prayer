import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import styles from '../styles/AddPrayerStyle';
import HeaderBlack from '../components/HeaderBlack';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import Button from '../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import PrayerService from '../services/Prayer/PrayerService';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as commonAction from '../actions/Common/CommonAction';
const { width, height } = Dimensions.get('window');

const EditPrayerScreen = ({ navigation, route }) => {

  const { id } = route?.params;

  const dispatch = useDispatch();

  const [prayerId, setPrayerId] = useState(id);
  const [prayer, setPrayer] = useState(null);
  const [prayerTitle, setPrayerTitle] = useState('');
  const [PrayerDesc, setPrayerDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const isFocused = useIsFocused();

  const loadPrayer = async (id) => {
    var response = await PrayerService.GetPrayersById(id);
    if (response.success) {
      setPrayerTitle(response?.data?.title)
      setPrayerDesc(response?.data?.description)
      setPrayer(response?.data);
      if (response?.data?.image !== null) {
        setSelectedImage(response?.data?.image)
      }
    }
  }

  useEffect(() => {
    if (id) {
      setPrayerId(id);
      loadPrayer(id)
    }
  }, [id]);

  const onPressSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response?.assets[0]?.uri;
        setSelectedImageBase64(response?.assets[0]?.base64);
        setSelectedImage(source);
      }
    });
  };

  const onPressSaveBtn = async () => {
    if (prayerTitle == '') {
      showMessage({
        message: 'Please Enter Title',
        type: 'danger',
      });
    } else if (PrayerDesc == '') {
      showMessage({
        message: 'Please Enter Description',
        type: 'danger',
      });
    }

    else {

      var payload = {
        id: prayerId,
        title: prayerTitle,
        description: PrayerDesc,
        imageBase64: selectedImageBase64,
      };
      var response = await PrayerService.UpdatePrayer(payload);
      if (response?.success) {
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
    }

  };

  const onPressAnswered = async () => {
    var payload = {
      id: prayerId,
    };
    var response = await PrayerService.AnsweredPrayer(payload);
    if (response?.success) {
      loadPrayer(id);
      dispatch(commonAction.fetchMyPrayers());
      dispatch(commonAction.fetchMyAchivedPrayers());
      dispatch(commonAction.fetchMyAnsweredPrayers());
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  }

  const onPressPlayagain = async () => {
    var payload = {
      id: prayerId,
    };
    var response = await PrayerService.PlayAgainPrayer(payload);
    if (response?.success) {
      loadPrayer(id);
      dispatch(commonAction.fetchMyPrayers());
      dispatch(commonAction.fetchMyAchivedPrayers());
      dispatch(commonAction.fetchMyAnsweredPrayers());
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  }

  const onPressDelete = async () => {
    var payload = {
      id: prayerId,
    };
    var response = await PrayerService.DeletePrayer(payload);
    if (response?.success) {
      dispatch(commonAction.fetchMyPrayers());
      navigation.goBack();
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  }

  return (
    <React.Fragment>
      <HeaderBlack Name={'My Prayer'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="Enter prayer title..."
              placeholderTextColor={'#707070'}
              style={{
                paddingHorizontal: 20,
                fontSize: 25,
                fontFamily: ThemeFonts?.REGULAR,
                color: ThemeColors?.BLACK,
              }}
              value={prayerTitle}
              onChangeText={x => setPrayerTitle(x)}
            />
            <View style={styles.DividerView} />
            <View style={styles.contentContainerStyle}>
              <Text style={styles.ImagesText}>IMAGES</Text>
              {selectedImage == null && (
                <TouchableOpacity
                  onPress={() => {
                    onPressSelectImage();
                  }}>
                  <Image
                    source={require('../../assets/images/Button.png')}
                    style={{ width: 104, height: 27, marginLeft: -5 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {selectedImage !== null && (
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: 'center'
                  }}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{
                      width: width - 40,
                      height: width / 2 + 50,
                      borderRadius: 5,
                      alignItems: 'center'
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(null);
                      }}>
                      <Entypo
                        name="circle-with-cross"
                        style={{ color: ThemeColors.BLACK }}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            {prayer && (<>
              <View style={styles.DividerView} />
              <View style={styles.contentContainerStyle}>
                <Text
                  style={[styles.ImagesText, { marginVertical: 0, marginTop: 15 }]}>
                  DATE CREATED
                </Text>
                <Text
                  style={{
                    marginVertical: 0,
                    fontSize: 15,
                    fontFamily: ThemeFonts.REGULAR,
                    color: ThemeColors.GRAY,
                  }}>
                  {moment(
                    new Date(prayer?.createdAt),
                    'DD-MMM-YYYY, hh:mm A',
                  ).format('DD/MM/YYYY')}
                </Text>
              </View>
            </>
            )}
            <View style={styles.DividerView} />
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
  multiline={true}
  style={{
    fontSize: 15,
    fontFamily: ThemeFonts?.REGULAR,
    height: 80,
    marginLeft: -5,
    color: ThemeColors.BLACK, // Add this line to set text color to black
  }}
  value={PrayerDesc}
  onChangeText={x => setPrayerDesc(x)}
/>
            </View>

            {prayer && prayer?.isAnswered === true && (
              <>
                <View style={styles.DividerView} />
                <View style={styles.contentContainerStyle}>
                  <Text
                    style={[styles.ImagesText, { marginVertical: 0, marginTop: 15 }]}>
                    DATE MARKED AS ANSWERED
                  </Text>
                  <Text
                    style={{
                      marginVertical: 0,
                      fontSize: 15,
                      fontFamily: ThemeFonts.REGULAR,
                      color: ThemeColors.GRAY,
                    }}>
                    {moment(
                      new Date(prayer?.answeredAt),
                      'DD-MMM-YYYY, hh:mm A',
                    ).format('MMMM DD, YYYY')}
                  </Text>
                </View>
              </>
            )}

            <View
              style={[
                styles.centeredViewSimple,
                {
                  justifyContent: 'flex-end',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  onPressSaveBtn();
                }}>
                <Image
                  source={require('../../assets/images/save-btn.png')}
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
      </ScrollView>
      <View style={styles.ButtonView}>
        {prayer && prayer?.isAnswered === false && (
          <TouchableOpacity style={styles.ActionButton} onPress={onPressAnswered}>
            <Feather name="check" style={{ color: '#4BB543' }} size={28} />
            <Text style={styles.ActionButtonText}>Answered</Text>
          </TouchableOpacity>
        )}

        {prayer && prayer?.isAnswered === true && (
          <TouchableOpacity style={styles.ActionButton} onPress={onPressPlayagain}>
            <MaterialIcons name="loop" style={{ color: '#4BB543' }} size={28} />
            <Text style={styles.ActionButtonText}>Play Again</Text>
          </TouchableOpacity>
        )}

        {prayer && (
          <TouchableOpacity style={styles.ActionButton} onPress={onPressDelete}>
            <AntDesign name="delete" style={{ color: '#D11A2A' }} size={22} />
            <Text style={[styles.ActionButtonText, { marginLeft: 4 }]}>Delete</Text>
          </TouchableOpacity>
        )}

      </View>
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
                You have successfully{'\n'}Update the prayer!
              </Text>
              <View style={{ marginTop: 20 }}>
                <Button
                  title={`Continue`}
                  onPress={() => {
                    setModalVisible(false);
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

export default EditPrayerScreen;
