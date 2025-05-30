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
} from 'react-native';
import BackHeader from '../components/BackHeader';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');

const AddFeedPrayerScreen = ({ navigation, route }) => {
  const { feedId, onAddPrayer } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showMessage({
        message: 'Please enter a prayer title',
        type: 'danger',
      });
      return;
    }
    if (!description.trim()) {
      showMessage({
        message: 'Please enter a prayer description',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      await onAddPrayer({
        title: title.trim(),
        description: description.trim(),
        type: 'feed',
        feedId,
        imagesheets: image || '',
      });
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

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Add Prayer" />
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
            />
            <View style={styles.DividerView} />
            <View style={styles.contentContainerStyle}>
              <Text style={styles.ImagesText}>IMAGES</Text>
              {!image && (
                <TouchableOpacity onPress={handleSelectImage}>
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
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                    }}>
                    <TouchableOpacity onPress={() => setImage(null)}>
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
                }}
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
            <View style={styles.DividerView} />
            <View
              style={[
                styles.centeredViewSimple,
                {
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                },
              ]}>
              <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                <Image
                  source={require('../../assets/images/nextButton.png')}
                  style={{
                    width: 83,
                    height: 83,
                    marginTop: 20,
                    opacity: loading ? 0.5 : 1,
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
  centeredViewSimple: {
    alignItems: 'center',
  },
  LogoText: {
    fontSize: 10,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default AddFeedPrayerScreen;