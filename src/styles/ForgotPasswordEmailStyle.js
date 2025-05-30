import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    ScrollViewContentContainerStyle:{
        minHeight: height - 24
    },
    MainContainer: {
        flex: 1,
        backgroundColor: ThemeColors.WHITE
    },
    LogoContainer: {
        height: width - 180,
        backgroundColor: ThemeColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentContainer: {
        backgroundColor: ThemeColors.WHITE,
        flexGrow: 1,
        padding: 20,
        paddingBottom: 0,
    },
    TitleTextContainer:{
        marginVertical: 15
    },
    TitleText:{
        fontSize: 22,
        color: ThemeColors.BLACK,
        fontFamily: ThemeFonts.REGULAR
    },
    ContinueButtonContainer:{
        marginTop: 30
    },
    ResendCodeTextContainer: {
        paddingVertical: 10
    },
    ResendCodeTextTouch: {
        alignSelf: 'flex-end'
    },
    ResendCodeText: {
        fontSize: 15,
        color: ThemeColors.WHITE,
        fontFamily: ThemeFonts.MEDIUM,
        textDecorationLine: 'underline'
    },
    SignInTextContainer: {
        marginVertical: 15,
    },
    SignInTextTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    SignInText: {
        fontSize: 15,
        color: ThemeColors.DARK_GRAY,
        fontFamily: ThemeFonts.LIGHT,
        textDecorationLine: 'underline'
    },
    SignInText2: {
        fontSize: 15,
        color: ThemeColors.BLACK,
        fontFamily: ThemeFonts.REGULAR,
        textDecorationLine: 'none'
    },
});