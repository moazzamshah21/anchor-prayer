import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackHeader from '../components/BackHeader';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import RestClient from '../services/RestClient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showMessage } from 'react-native-flash-message';

const CreateFeedPrayersScreen = ({ navigation, route }) => {
  const { feedId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0];
        setImage({
          uri: selectedImage.uri,
          type: selectedImage.type || 'image/jpeg',
          name: selectedImage.fileName || `image_${Date.now()}.jpg`,
        });
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

  const uploadImage = async () => {
    if (!image) return null;

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });

      console.log('Uploading image...', formData);
      const response = await RestClient.Upload('/upload/image', formData);
      console.log('Image upload response:', response);

      if (response.success) {
        return response.data.url;
      } else {
        throw new Error(response.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      showMessage({
        message: 'Image upload failed',
        description: error.message,
        type: 'danger',
      });
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showMessage({
        message: 'Title is required',
        type: 'danger',
      });
      return;
    }

    if (!description.trim()) {
      showMessage({
        message: 'Description is required',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = image ? await uploadImage() : null;

      const prayerData = {
        title,
        descriptions: description,
        feedId,
        ...(imageUrl && { image: imageUrl }),
      };

      console.log('Submitting prayer data:', prayerData);
      const response = await RestClient.Post('/prayer/create', prayerData);
      console.log('Prayer creation response:', response);

      if (response.success) {
        showMessage({
          message: 'Prayer created successfully',
          type: 'success',
        });
        navigation.goBack();
      } else {
        throw new Error(response.message || 'Failed to create prayer');
      }
    } catch (error) {
      console.error('Prayer creation error:', error);
      showMessage({
        message: 'Error creating prayer',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <BackHeader navigation={navigation} title="Create Prayer" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          {/* Image Upload */}
          <TouchableOpacity
            style={styles.imageUploadContainer}
            onPress={selectImage}
            disabled={imageUploading}
          >
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.selectedImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <AntDesign name="camera" size={32} color={ThemeColors.DARK_GRAY} />
                <Text style={styles.imagePlaceholderText}>Add Image (Optional)</Text>
              </View>
            )}
            {imageUploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="small" color={ThemeColors.WHITE} />
              </View>
            )}
          </TouchableOpacity>

          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter prayer title"
              placeholderTextColor={ThemeColors.LIGHT_GRAY}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description*</Text>
            <TextInput
              placeholder="Add a description to this feed...You can even use hashtags: #family #feed etc."
              placeholderTextColor={'#707070'}
              style={{
                fontSize: 15,
                fontFamily: ThemeFonts.REGULAR,
                color: ThemeColors.BLACK,
                height: 120,
                borderWidth: 1,
                borderColor: ThemeColors.LIGHT_GRAY,
                borderRadius: 8,
                padding: 15,
                textAlignVertical: 'top',
              }}
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={500}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading || imageUploading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={ThemeColors.WHITE} />
        ) : (
          <Text style={styles.submitButtonText}>Create Prayer</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  formContainer: {
    padding: 20,
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: ThemeColors.LIGHT_GRAY_2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.LIGHT_GRAY,
  },
  imagePlaceholderText: {
    marginTop: 10,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 14,
    color: ThemeColors.DARK_GRAY,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
    color: ThemeColors.DARK,
    marginBottom: 8,
  },
// input: {
//   borderWidth: 1,
//   borderColor: ThemeColors.LIGHT_GRAY,
//   borderRadius: 8,
//   padding: 15,
//   fontFamily: ThemeFonts.REGULAR,
//   fontSize: 16,
//   color: ThemeColors.DARK, // Make sure this is set
// },
  // multilineInput: {
  //   minHeight: 120,
  //   paddingTop: 15,
  // },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: ThemeColors.PRIMARY,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  submitButtonText: {
    fontFamily: ThemeFonts.SEMIBOLD,
    fontSize: 18,
    color: ThemeColors.WHITE,
  },
});

export default CreateFeedPrayersScreen;