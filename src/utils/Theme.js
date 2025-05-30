import {Dimensions, Platform, PixelRatio} from 'react-native';

const ThemeColors = {
  WHITE: '#FFF',
  BLACK: '#000000',
  GRAY: '#999999',
  LIGHT_GRAY: '#c4c4c4',
  DARK_GRAY: '#666666',
};

const GradientColors = {
  BLUE: ['#00FFDC', '#00628C'],
  ORANGE: ['#E3A500', '#452302'],
  RED: ['#FC0312', '#EC1A27'],
  GREEN: ['#3BA20F', '#113D03'],
};

const {width, height} = Dimensions.get('window');
const scale = width / 320;

const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const FontSize = {
  xxxxsmall: normalize(6),
  xxxsmall: normalize(7),
  xxsmall: normalize(8),
  xsmall: normalize(9),
  small: normalize(10),
  regular: normalize(11),
  medium: normalize(12),
  large: normalize(14),
  xlarge: normalize(16),
  xxlarge: normalize(18),
  xxxlarge: normalize(22),
};

const ThemeFonts = {
  BLACK: 'Poppins-Black',
  BLACK_ITALIC: 'Poppins-BlackItalic',
  BOLD: 'Poppins-Bold',
  BOLD_ITALIC: 'Poppins-BoldItalic',
  EXTRA_BOLD: 'Poppins-ExtraBold',
  EXTRA_BOLD_ITALIC: 'Poppins-ExtraBoldItalic',
  EXTRA_LIGHT: 'Poppins-ExtraLight',
  EXTRA_LIGHT_ITALIC: 'Poppins-ExtraLightItalic',
  ITALIC: 'Poppins-Italic',
  LIGHT: 'Poppins-Light',
  LIGHT_ITALIC: 'Poppins-LightItalic',
  MEDIUM: 'Poppins-Medium',
  MEDIUM_ITALIC: 'Poppins-MediumItalic',
  REGULAR: 'Poppins-Regular',
  SEMI_BOLD: 'Poppins-SemiBold',
  SEMI_BOLD_ITALIC: 'Poppins-SemiBoldItalic',
  THIN: 'Poppins-Thin',
  THIS_ITALIC: 'Poppins-ThinItalic',
};

export {ThemeColors, FontSize, ThemeFonts, GradientColors};
