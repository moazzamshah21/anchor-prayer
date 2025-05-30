
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, I18nManager, TouchableOpacity } from 'react-native';
import { FontSize, ThemeColors, ThemeFonts } from '../utils/Theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const TextBox = ({ icon, label, ...props }) => {

    const { textBoxStyle, isRequired } = props;
    const Icon = icon;
    const [secureTextEntry, setSecureTextEntry] = useState(props?.secureTextEntry)

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (props?.onDoneTyping) {
                props?.onDoneTyping();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn)
    }, [props?.value]);

    return (
        <View>
            {label && (
                <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5, alignItems: 'center' }}>
                    <Text style={styles.InputLabel}>{label} {isRequired && <Text style={{ color: 'red', }}>*</Text>}</Text>
                </View>
            )}
            <View style={styles.TextBoxView}>
                {icon && <Icon />}
                <TextInput
                    {...props}
                    cursorColor={ThemeColors.BLACK}
                    value={props.value == null ? '' : props.value.replace(/^\s+/, '')}
                    multiline={false}
                    placeholderTextColor={ThemeColors.LightGrayColor}
                    style={[styles.TextBox, textBoxStyle]}
                    secureTextEntry={secureTextEntry}
                />
                {props?.secureTextEntry != undefined &&
                    <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => setSecureTextEntry(previousState => !previousState)}>
                        {secureTextEntry == true ?
                            <EntypoIcon name="eye" style={{ color: ThemeColors.BLACK }} size={20} />
                            :
                            <EntypoIcon name="eye-with-line" style={{ color: ThemeColors.BLACK }} size={20} />
                        }
                    </TouchableOpacity>
                }
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    TextBoxView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: ThemeColors.BLACK,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        overflow: 'hidden'
    },
    TextBox: {
        height: 55,
        fontSize: FontSize.medium,
        color: ThemeColors.BLACK,
        backgroundColor: ThemeColors.WHITE,
        width: '100%',
        flexShrink: 1,
    },
    InputLabel: {
        fontSize: 15,
        color: ThemeColors.DARK_GRAY,
        fontFamily: ThemeFonts.LIGHT,
        textAlign: 'left'
    },
});

export default TextBox;
