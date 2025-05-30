import React, {useEffect, useState} from 'react';
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
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import Button from '../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const AddPrayerScreen = ({navigation, route}) => {
  
  const [prayerTitle, setPrayerTitle] = useState('');
  const [PrayerDesc, setPrayerDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPrayerTitle('');
      setPrayerDesc('');
      setSelectedImage(null);
    }
  }, [isFocused]);

  const onPressSelectImage = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
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

  const onPressNextBtn = () => {
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
      setTimeout(() => {
        navigation.navigate('ConfirmPrayScreen', {
          data: {
            title: prayerTitle,
            desc: PrayerDesc,
            image: selectedImage,
            imagebase64: selectedImageBase64,
            name: "",
          },
        });
      }, 500);
    }
  };

  return (
    <React.Fragment>
      <HeaderBlack lessThenIcon Name={'Pray'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 50}}>
            <TextInput
              placeholder="Enter prayer title..."
              placeholderTextColor={'#707070'}
              style={{
                paddingHorizontal: 40,
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
                    style={{width: 104, height: 27, marginLeft: -5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {selectedImage != null && (
                <View
                  style={{
                    marginTop: 5,
                  }}>
                  <Image
                    source={{uri: selectedImage}}
                    style={{
                      width: width - 40,
                      height: width / 2 + 50,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
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
                        style={{color: ThemeColors.BLACK}}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.DividerView} />

            <View style={styles.contentContainerStyle}>
              <Text
                style={[styles.ImagesText, {marginVertical: 0, marginTop: 15}]}>
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
                }}
                value={PrayerDesc}
                onChangeText={x => setPrayerDesc(x)}
              />
            </View>
            <View style={styles.DividerView} />
            <View
              style={[
                styles.centeredViewSimple,
                {
                  justifyContent: 'flex-end',
                },
              ]}>
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
        <View style={{alignItems: 'center', marginBottom: 10}}>
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
              style={{width: 90, height: 70}}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/verified.png')}
              style={{width: 22, height: 22, marginTop: -20, marginLeft: 65}}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.ModalTextStyle}>
                Yahoo! You have successfully{'\n'}Added the prayer!
              </Text>
              <View style={{marginTop: 20}}>
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

export default AddPrayerScreen;
