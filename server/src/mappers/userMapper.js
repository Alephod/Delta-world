class UserMapper {
    constructor() {
        this.convertUsersList = this.convertUsersList.bind(this);
        this.convertUserPreview = this.convertUserPreview.bind(this);
        this.convertUser = this.convertUser.bind(this);
    }

    convertUsersList(userList) {
        const data = userList.data.map((item) => this.convertUserPreview(item));
        const { page, limit, total } = userList;
        return { data, page, limit, total };
    }
    convertUserPreview(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            title: user.title
        };
    }
    convertUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            title: user.title,
            registerDate: user.registerDate,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phone: user.phone,
            picture: user.picture
        };
    }
}

export default new UserMapper();
