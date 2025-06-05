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
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/AddPrayerStyle';
import HeaderBlack from '../components/HeaderBlack';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import Button from '../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import RestClient from '../services/RestClient';

const {width, height} = Dimensions.get('window');

const CreateFeedScreen = ({navigation, route}) => {
  const [feedTitle, setFeedTitle] = useState('');
  const [feedDesc, setFeedDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      resetForm();
    }
  }, [isFocused]);

  useEffect(() => {
    validateForm();
  }, [feedTitle, feedDesc, selectedImageBase64]);

  const resetForm = () => {
    setFeedTitle('');
    setFeedDesc('');
    setSelectedImage(null);
    setSelectedImageBase64(null);
    setIsFormValid(false);
    setIsSubmitting(false);
  };

  const validateForm = () => {
    setIsFormValid(
      feedTitle.trim() !== '' && 
      feedDesc.trim() !== '' && 
      selectedImageBase64 !== null
    );
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ we need READ_MEDIA_IMAGES instead of READ_EXTERNAL_STORAGE
        const permission = Platform.Version >= 33 ?
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES :
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(
          permission,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your photos',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true; // iOS doesn't need this permission
  };

  const handleImageSelection = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        showMessage({
          message: 'Permission required',
          description: 'Please allow storage access in settings',
          type: 'danger',
        });
        return;
      }

      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
        showMessage({
          message: 'Failed to select image',
          type: 'danger',
        });
      } else if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        setSelectedImageBase64(asset.base64);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      showMessage({
        message: 'Error selecting image',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const payload = {
        title: feedTitle,
        imageBase64: selectedImageBase64,
        description: feedDesc,
      };

      const response = await RestClient.Post('/feed/add-feed', payload);
      
      if (response.success) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('FeedsListScreen');
        }, 2000);
      } else {
        showMessage({
          message: response.message || 'Failed to create feed',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      showMessage({
        message: 'Network error. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <HeaderBlack lessThenIcon Name={'Create Feed'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 50}}>
            <TextInput
              placeholder="Enter feed title..."
              placeholderTextColor={'#707070'}
              style={{
                paddingHorizontal: 40,
                fontSize: 25,
                fontFamily: ThemeFonts?.REGULAR,
                color: ThemeColors?.BLACK,
              }}
              value={feedTitle}
              onChangeText={setFeedTitle}
              maxLength={100}
            />
            <View style={styles.DividerView} />
            
            <View style={styles.contentContainerStyle}>
              <Text style={styles.ImagesText}>IMAGES</Text>
              <TouchableOpacity
                onPress={handleImageSelection}
                activeOpacity={0.7}>
                {selectedImage ? (
                  <View style={{marginTop: 5}}>
                    <Image
                      source={{uri: selectedImage}}
                      style={{
                        width: width - 40,
                        height: width / 2 + 50,
                        borderRadius: 5,
                        alignSelf: 'center',
                      }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 15,
                        padding: 5,
                      }}
                      onPress={() => {
                        setSelectedImage(null);
                        setSelectedImageBase64(null);
                      }}>
                      <Entypo
                        name="circle-with-cross"
                        style={{color: ThemeColors.WHITE}}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Image
                    source={require('../../assets/images/Button.png')}
                    style={{width: 104, height: 27, marginLeft: -5}}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.DividerView} />

            <View style={styles.contentContainerStyle}>
              <Text style={[styles.ImagesText, {marginVertical: 0, marginTop: 15}]}>
                DESCRIPTION
              </Text>
              <TextInput
                placeholder="Add a description to this feed...You can even use hashtags: #family #feed etc."
                placeholderTextColor={'#707070'}
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts?.REGULAR,
                  color: ThemeColors?.BLACK, // Added black text color
                  height: 80,
                  marginLeft: -5,
                }}
                value={feedDesc}
                onChangeText={setFeedDesc}
                multiline
                maxLength={500}
              />
            </View>
            <View style={styles.DividerView} />
            
            <View style={[styles.centeredViewSimple, {justifyContent: 'flex-end'}]}>
              {isSubmitting ? (
                <ActivityIndicator size="large" color={ThemeColors.PRIMARY} />
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={isFormValid ? 0.7 : 1}
                  disabled={!isFormValid}>
                  <Image
                    source={require('../../assets/images/nextButton.png')}
                    style={{
                      width: 83,
                      height: 83,
                      marginTop: 20,
                      opacity: isFormValid ? 1 : 0.5,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
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
                Yahoo! You have successfully{'\n'}Created the feed!
              </Text>
              <View style={{marginTop: 20}}>
                <Button
                  title={`Continue`}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.goBack();
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

export default CreateFeedScreen;