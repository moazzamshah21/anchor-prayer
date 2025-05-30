import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import React from 'react';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { BellIcon } from '../../assets/svg/SvgIcons';
const { width, height } = Dimensions.get('window');

const Header = ({ navigation, title = "" }) => {

  const handleOnPressMenu = () => {
    navigation.goBack();
  }

  const handleOnBellMenu = () => {

  }

  return (
    <View
      style={styles.MainContainer}>
      <View style={styles.TouchItem}>
        <TouchableOpacity onPress={handleOnPressMenu}>
          <FontAwesome5 name="angle-left" style={{ color: ThemeColors.WHITE }} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.LogoContainer}>
        <Text style={styles.HeaderTitle}>{title}</Text>
      </View>
      <View style={[styles.TouchItem, { alignItems: 'flex-end' }]}>
        <TouchableOpacity onPress={handleOnBellMenu}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    height: 50,
    backgroundColor: ThemeColors?.BLACK,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  LogoContainer: {
    paddingTop: 10,
    height: 50,
    backgroundColor: ThemeColors?.BLACK,
    flexGrow: 1,
    alignItems: 'center'
  },
  TouchItem: {
    height: 50,
    width: 50,
    justifyContent: 'center'
  },
  HeaderTitle: {
    color: ThemeColors.WHITE,
    fontSize: 20,
    fontFamily: ThemeFonts.MEDIUM
  }
});
