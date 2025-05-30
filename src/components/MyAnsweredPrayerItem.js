import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { createRef, useState } from 'react';
import PrayerService from '../services/Prayer/PrayerService';
import { showMessage } from 'react-native-flash-message';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');

const MyAnsweredPrayerItem = ({ item, index, navigation, onPressPray, onArchiveSuccess }) => {

  const handleOnPressArchivePrayer = async (id) => {
    var payload = {
      id: id,
    };
    var response = await PrayerService.ArchivePrayer(payload);
    if (response?.success) {
      if (onArchiveSuccess) {
        onArchiveSuccess()
      }
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <View
      key={`index-${index}`}
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
          <Text style={styles.ViewedText} >
            <Image
              source={require('../../assets/images/like.png')}
              style={{
                width: 10,
                height: 10,
                marginLeft: -2,
              }}
              resizeMode="contain"
            />
            <Text style={styles.ViewedText}>
              {' '}{item?.likeCount} people like this
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditPrayerScreen", { id: item?._id })
          }}
          style={{
            backgroundColor: '#F0EFEF',
            borderRadius: 20,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Feather name="edit" style={{ color: '#000' }} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyAnsweredPrayerItem;

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
  NumberText: {
    fontSize: 12,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    marginTop: 4,
    marginLeft: 5,
  },
  BlackDivider: {
    height: 2,
    width: width,
    backgroundColor: ThemeColors?.DARK_GRAY,
    alignSelf: 'center',
  },
  TextContainerStyle: {
    marginLeft: 5,
  },
  TextInputStyle: {
    borderRadius: 20,
    borderColor: ThemeColors?.BLACK,
    borderWidth: 1,
    height: 35,
    flexGrow: 1,
    paddingHorizontal: 15,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SmileyView: {
    borderRadius: 35,
    width: 35,
    height: 35,
    backgroundColor: '#DDCFCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageCenteredView: {
    borderRadius: 50,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ThemeColors?.BLACK,
    borderWidth: 1,
  },
  GrayBox: {
    width: 215,
    height: 62,
    borderRadius: 10,
    backgroundColor: '#E8E4E4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 12,
  },
  likeTextBtn: {
    fontSize: 8,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    marginLeft: 10,
  },
  CommentBoxText: {
    fontSize: 10,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    width: '95%',
  },
  NameHeading: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.BOLD,
  },
});
