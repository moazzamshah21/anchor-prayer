import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PrayerService from '../services/Prayer/PrayerService';
import { showMessage } from 'react-native-flash-message';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const MyPrayerItem = ({ item, index, navigation, onPressPray, onArchiveSuccess }) => {
  const handleOnPressArchivePrayer = async (id) => {
    try {
      const payload = { id: id };
      const response = await PrayerService.ArchivePrayer(payload);
      
      if (response?.success) {
        showMessage({
          message: 'Prayer archived successfully',
          type: 'success',
        });
        onArchiveSuccess?.(); // Call the success callback
      } else {
        showMessage({
          message: response?.message || 'Failed to archive prayer',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error archiving prayer',
        type: 'danger',
      });
      console.error('Archive error:', error);
    }
  };
  const handlePressPray = () => {
    console.log('Prayer Data:', item); // Verify the item has description
    navigation.navigate("MyPrayerDetailScreen", { 
      prayerData: {
        _id: item._id,
        title: item.title,
        body: item.body,
        description: item.description, // Make sure this exists
        isAnswered: item.isAnswered,
        likeCount: item.likeCount
        // include any other needed fields
      },
      isEditable: true 
    });
  };

  return (
    <View
      style={{
        borderRadius: 15,
        borderColor: ThemeColors?.BLACK,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 30,
        alignSelf: 'center',
        paddingHorizontal: 15,
        height: 70,
        marginVertical: 8,
      }}>
      <View style={{ justifyContent: 'center', flexGrow: 1 }}>
        <Text style={styles.HelloText}>{item?.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.ViewedText}>
            <Image
              source={require('../../assets/images/like.png')}
              style={styles.likeIcon}
              resizeMode="contain"
            />
            {' '}{item?.likeCount} people like this
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handleOnPressArchivePrayer(item?._id)}
          style={styles.iconButton}>
          <MaterialIcons name="archive" style={{ color: '#000' }} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPrayerScreen", { id: item?._id })}
          style={[styles.iconButton, { marginLeft: 10 }]}>
          <Feather name="edit" style={{ color: '#000' }} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handlePressPray}>
          <ImageBackground
            source={require('../../assets/images/bggreen.png')}
            style={styles.prayButtonBackground}
            resizeMode="contain">
            <Text style={styles.ActivePrayText}>Pray</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HelloText: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  ViewedText: {
    fontSize: 8,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  ActivePrayText: {
    fontSize: 10,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    textAlign: 'center',
  },
  likeIcon: {
    width: 10,
    height: 10,
    marginLeft: -2,
  },
  iconButton: {
    backgroundColor: '#F0EFEF',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayButtonBackground: {
    width: 85,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyPrayerItem;