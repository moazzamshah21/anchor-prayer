import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
    ScrollViewContentContainerStyle:{
        minHeight: height - statusBarHeight
    },
    MainContainer: {
        flex: 1,
        backgroundColor: ThemeColors.WHITE
    },
    LogoContainer: {
        height: width - 100,
        backgroundColor: ThemeColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentContainer: {
        backgroundColor: ThemeColors.WHITE,
        flexGrow: 1,
        padding: 20,
        paddingBottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    ForgetPasswordTextContainer: {
        paddingVertical: 10,
        marginBottom: 35
    },
    ForgetPasswordTextTouch: {
        alignSelf: 'flex-end'
    },
    ForgetPasswordText: {
        fontSize: 15,
        color: ThemeColors.BLACK,
        fontFamily: ThemeFonts.LIGHT,
        textDecorationLine: 'underline'
    },
    SignUpTextContainer: {
        marginVertical: 15,
    },
    SignUpTextTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    SignUpText: {
        fontSize: 15,
        color: ThemeColors.LIGHT_GRAY,
        fontFamily: ThemeFonts.LIGHT,
        textDecorationLine: 'underline'
    },
    SignUpText2: {
        fontSize: 15,
        color: ThemeColors.BLACK,
        fontFamily: ThemeFonts.REGULAR,
        textDecorationLine: 'none'
    },
    SocialLoginContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'flex-end',
        flexGrow: 1,
    },
    SocialLoginCircleContainer:{
        justifyContent:'center',
        alignItems:'center',
        width: 30,
        height: 30,
        backgroundColor: ThemeColors.BLACK,
        borderRadius: 15,
        margin: 6
    }
});