import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validatePhoneNumber = (phoneNumber, country) => {
    try {
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, country);
        if (phoneNumberObj && phoneNumberObj.isValid()) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    return false;
}

const validateEmail = (email) => {
    try {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === true) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { validatePhoneNumber, validateEmail }