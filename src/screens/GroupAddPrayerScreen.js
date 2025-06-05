import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');

const GroupAddPrayerScreen = ({ navigation, route }) => {
  const { groupId, onAddPrayer } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const selectImage = async () => {
    try {
      setImageLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
      });

      if (!result.didCancel && !result.errorCode) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);
        setImageBase64(selectedImage.base64);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      showMessage({
        message: 'Failed to select image',
        type: 'danger',
      });
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      showMessage({
        message: 'Please fill all required fields',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      const prayerData = {
        title: title.trim(),
        description: description.trim(),
        type: 'group',
        groupId: groupId,
      };

      if (imageBase64) {
        prayerData.imageBase64 = imageBase64;
      }

      await onAddPrayer(prayerData);
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: 'Failed to add prayer. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if all required fields are filled
  const isSubmitDisabled = !title.trim() || !description.trim() || loading;

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Add Group Prayer" />
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
              value={title}
              onChangeText={setTitle}
              autoFocus={true}
            />
            <View style={styles.DividerView} />
            
            <View style={styles.contentContainerStyle}>
              <Text style={styles.ImagesText}>IMAGE</Text>
              {!image && (
                <TouchableOpacity onPress={selectImage} disabled={imageLoading}>
                  <Image
                    source={require('../../assets/images/Button.png')}
                    style={{ width: 104, height: 27, marginLeft: -5 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {image && (
                <View style={{ marginTop: 5 }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: width - 40,
                      height: width / 2 + 50,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                    }}>
                    <TouchableOpacity onPress={() => {
                      setImage(null);
                      setImageBase64('');
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
            <View style={styles.DividerView} />

            <View style={styles.contentContainerStyle}>
              <Text style={[styles.ImagesText, { marginVertical: 0, marginTop: 15 }]}>
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
    color: ThemeColors.BLACK, // Add this line to make text black
  }}
  value={description}
  onChangeText={setDescription}
  multiline
/>
            </View>
            <View style={styles.DividerView} />
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity 
                onPress={handleSubmit} 
                disabled={isSubmitDisabled}
              >
                <Image
                  source={require('../../assets/images/nextButton.png')}
                  style={{
                    width: 83,
                    height: 83,
                    marginTop: 20,
                    opacity: isSubmitDisabled ? 0.5 : 1,
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
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flexGrow: 1,
  },
  MainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  DividerView: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 15,
  },
  contentContainerStyle: {
    paddingHorizontal: 40,
  },
  ImagesText: {
    fontSize: 12,
    fontFamily: ThemeFonts.SEMIBOLD,
    color: ThemeColors.BLACK,
    marginVertical: 15,
  },
  submitButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  LogoText: {
    fontSize: 10,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default GroupAddPrayerScreen;