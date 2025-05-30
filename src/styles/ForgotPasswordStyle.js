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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    TitleTextContainer:{
        marginVertical: 15
    },
    TitleText:{
        fontSize: 22,
        fontFamily: ThemeFonts.REGULAR,
        color: ThemeColors.BLACK
    },
    UpdateButtonContainer:{
        marginTop: 30
    },
});