import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    ScrollViewContentContainerStyle:{
        minHeight: height - 24
    },
    MainContainer:{
        flex: 1,
        backgroundColor: ThemeColors.WHITE
    },
    LogoContainer: {
        height: width - 180,
        backgroundColor: ThemeColors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentContainer:{
        backgroundColor: ThemeColors.WHITE,
        flexGrow: 1,
        padding: 20,
    },
    SignUpButtonContainer: {
        marginTop: 30
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