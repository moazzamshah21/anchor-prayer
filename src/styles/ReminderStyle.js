import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
    ScrollViewContentContainerStyle: {
        minHeight: height - statusBarHeight - 50
    },
    MainContainer: {
        flex: 1,
        backgroundColor: ThemeColors.WHITE,
        justifyContent: 'center',
        flexGrow: 1,
    },
    MainBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    MainIconImage: {
        height: 120
    },
    AddIconImage: {
        height: 80
    },
    CreateGroupText: {
        paddingVertical: 15,
        fontSize: 20,
        fontFamily: ThemeFonts.REGULAR,
        textAlign: 'center',
        color: ThemeColors.BLACK
    },
    CompanyBrandingText: {
        fontFamily: ThemeFonts.MEDIUM,
        color: ThemeColors.BLACK,
        fontSize: 15,
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 30,
    },
});
