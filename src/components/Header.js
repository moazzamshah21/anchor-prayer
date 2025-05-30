import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { BellIcon } from '../../assets/svg/SvgIcons';
const { width, height } = Dimensions.get('window');

const Header = ({ navigation }) => {

  const handleOnPressMenu = () => {
    navigation.toggleDrawer();
  }

  const handleOnBellMenu = () => {

  }

  return (
    <View
      style={styles.MainContainer}>
      <View style={styles.TouchItem}>
        <TouchableOpacity onPress={handleOnPressMenu}>
          <SimpleLineIcons name="menu" style={{ color: ThemeColors.BLACK }} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.LogoContainer}>
        <Image
          source={require('../../assets/images/header-logo.png')}
          style={{ width: 85, height: 85 }}
          resizeMode="center"
        />
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
    height: 100,
    backgroundColor: ThemeColors?.WHITE,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  LogoContainer: {
    paddingTop: 10,
    height: 100,
    backgroundColor: ThemeColors?.WHITE,
    flexGrow: 1,
    alignItems: 'center'
  },
  TouchItem: {
    height: 70,
    width: 100,
    justifyContent: 'center'
  },
});
