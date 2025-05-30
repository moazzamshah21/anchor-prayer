import AsyncStorage from '@react-native-async-storage/async-storage';

const GetData = (key) => {
    try {
        const value = AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return null
    }
};

const SetData = (key, data) => {
    try {
        AsyncStorage.setItem(key, data);
    } catch (error) {

    }
};

const RemoveData = (key) => {
    try {
        AsyncStorage.removeItem(key);
        return true;
    }
    catch (error) {
        return false;
    }
}

export default { GetData, SetData, RemoveData };