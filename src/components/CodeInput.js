import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';

const CodeInput = forwardRef((props, ref) => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index >= 0) {
            // Move focus to the previous TextInput and clear the current one on backspace
            if (index > 0) {
                inputRefs.current[index - 1].current.focus();
            }
            const updatedCode = [...code];
            updatedCode[index] = '';
            setCode(updatedCode);
            if(props?.onChangeCode){
                props?.onChangeCode(updatedCode.join(''))
            }
        }
       
    };

    const handleChangeText = (text, index) => {
        const updatedCode = [...code];
        updatedCode[index] = text;
        setCode(updatedCode);

        if (index < 3 && text !== '') {
            // Move focus to the next TextInput
            inputRefs.current[index + 1].current.focus();
        }
        if(props?.onChangeCode){
            props?.onChangeCode(updatedCode.join(''))
        }
    };

    useEffect(() => {
        if (ref) {
            ref.current = {
                clear: () => {
                    setCode(['', '', '', '']);
                    inputRefs.current[0].current.focus();
                },
            };
        }
    }, [ref]);

    return (
        <View style={styles.container}>
            {code.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={inputRefs.current[index]}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    cursorColor={ThemeColors.BLACK}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                    onFocus={() => inputRefs.current[index].current.clear()} // Clear the input when it gets focus
                    value={digit}
                />
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
    },
    input: {
        height: 64,
        width: 64,
        borderWidth: 1,
        borderColor: ThemeColors.BLACK,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'center'
    },
});

export default CodeInput;
