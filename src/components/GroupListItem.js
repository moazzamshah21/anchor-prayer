import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
const {width} = Dimensions.get('window');

const GroupListItem = ({navigation, item, index}) => {
  const onPressJoinGroup = async () => {
    var payload = {
      groupId: item?._id,
    };
    var response = await GroupService.JoinGroup(payload);
    if (response?.success) {
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
    <View style={styles.renderItemStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={styles.NameTExt}>{item?.name}</Text>
          <Text style={styles.DescText}>
            {item?.activeMemebersCount} active members
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onPressJoinGroup();
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={require('../../assets/images/round1.png')}
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="contain">
            <Text style={styles.PrayNowText}>Join{'\n'}Group</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupListItem;

const styles = StyleSheet.create({
  renderItemStyle: {
    width: width - 50,
    height: 67,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ThemeColors?.DARK_GRAY,
    alignSelf: 'center',
    marginVertical: 7,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  NameTExt: {
    fontSize: 15,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  DescText: {
    fontSize: 10,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.DARK_GRAY,
  },
  PrayNowText: {
    fontSize: 10,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
    textAlign: 'center',
  },
});
