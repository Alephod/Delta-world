export const emailValid: any = (emailStr: string) => {
    return /^[\w.]*@\w*.\w{2,}$/g.test(emailStr);
};

export const nameValid: any = (name: string) => {
    if (name.trim() === '') return 'no-name';
    else {
        const nameArr: Array<string> = name.split(' ');
        if (!nameArr[1]) return 'no-lastname';
        else if (nameArr[0].length < 2 || nameArr[1].length < 2) return 'less-2-symbols';
        else return true;
    }
};

export const phoneValid: any = (phone: string) => {
    if (phone === '') return undefined;
    else if (phone.length < 5) return false;
    else return true;
};

export const dateOfBirthValid: any = (dateOfBirth: string) => {
    if (dateOfBirth) return true;
    else return false;
};

export const genderValid: any = (gender: string) => {
    if (gender === '') return undefined;
};
