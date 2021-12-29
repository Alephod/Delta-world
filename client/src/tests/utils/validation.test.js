import { emailValid, nameValid, phoneValid, dateOfBirthValid, genderValid } from '../../utils/validation';

describe('Testing validation util', () => {
    test('emailValid', () => {
        expect(emailValid('anyname@any.any')).toBeTruthy();
        expect(emailValid('anynameany.any')).toBeFalsy();
    });
    test('nameValid', () => {
        expect(nameValid('')).toBe('no-name');
        expect(nameValid('Name')).toBe('no-lastname');
        expect(nameValid('N n')).toBe('less-2-symbols');
        expect(nameValid('Name names')).toBeTruthy();
    });
    test('phoneValid', () => {
        expect(phoneValid('78988')).toBeTruthy();
        expect(phoneValid('')).toBeUndefined();
        expect(phoneValid('78')).toBeFalsy();
    });
    test('dateOfBirthValid', () => {
        expect(dateOfBirthValid(new Date())).toBeTruthy();
        expect(dateOfBirthValid('')).toBeFalsy();
    });
    test('genderValid', () => {
        expect(genderValid('')).toBeUndefined();
    });
});
