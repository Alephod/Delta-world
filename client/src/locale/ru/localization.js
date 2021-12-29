const LOCALE_RU = {
    'header': {
        'pages': {
            'users': 'Пользователи',
            'posts': 'Посты'
        },
        'auth': {
            'login': 'Вход',
            'registration': 'Регистрация',
        },
        'profile': {
            'logout': 'Выход'
        }
    },
    'login': {
        'pageTitle': 'Delta World — Вход',
        'form': {
            'title': 'Вход',
            'id': {
                'label': 'ID',
                'placeholder': 'Введите свой ID',
                'error': 'Обязательное поле'
            },
            'button': 'Войти',
            'no-account': 'Ещё нет аккаунта?',
            'link': 'Зарегистрироваться'
        },
        'error': {
            'title': 'Не удалось выполнить вход в Delta World',
            'errors': 'Неверный ID'
        }
    },
    'registration': {
        'pageTitle': 'Delta World — Регистрация',
        'form': {
            'title': 'Регистрация',
            'name': {
                'label': 'Имя:',
                'placeholder': 'Введите своё имя',
                'error': 'Обязательное поле',
                'error--expected-firstname-and-lastname': 'Необходимо ввести имя и фамилию',
                'error--name-must-more-2-symbols': 'Имя и фамилия должны быть не короче 2 символов',

            },
            'email': {
                'label': 'Email:',
                'error': 'Некорректный email адрес'
            },
            'dateOfBirth': {
                'label': 'Дата рождения: ',
                'placeholder': 'ДД.ММ.ГГГГ',
                'error': 'Обязательное поле'
            },
            'gender': {
                'label': 'Пол: ',
                'man': 'Мужской',
                'woman': 'Женский',
            },
            'phone': {
                'label': 'Телефон: ',
                'error': 'Номер телефона должен быть не короче 5 цифр'
            },
            'button': 'Зарегистрироваться',
            'has-account': 'Уже есть аккаунт?',
            'link': 'Войти'
        },
        'error': {
            'title': 'Не удалось зарегистрировать нового пользователя',
        }
    },
    'user-info': {
        'pageTitle': 'Delta World — Пользователь',
        'gender': 'Пол: ',
        'dateOfBirth': 'Дата рождения: ',
        'dateOfRegistration': 'Дата регистрации: ',
        'email': 'Email: ',
        'phone': 'Телефон: ',
        'edit-profile': 'Редактировать',
        'undefined': 'Не указан'
    },
    'update-user': {
        'form': {
            'photo': {
                'delete': 'Удалить фотографию',
                'upload': 'Обновить фотографию'
            },
            'name': {
                'label': 'Имя:',
                'placeholder': 'Введите своё имя',
                'error': 'Обязательное поле',
                'error--expected-firstname-and-lastname': 'Необходимо ввести имя и фамилию',
                'error--name-must-more-2-symbols': 'Имя и фамилия должны быть не короче 2 символов',
            },
            'dateOfBirth': {
                'label': 'Дата рождения: ',
                'placeholder': 'ДД.ММ.ГГГГ',
                'error': 'Обязательное поле'
            },
            'dateOfRegistration': 'Дата регистрации: ',
            'email': 'Email: ',
            'gender': {
                'label': 'Пол: '
            },
            'phone': {
                'label': 'Телефон: ',
                'error': 'Номер телефона должен быть не короче 5 цифр'
            },
            'button': 'Сохранить',
            'has-account': 'Уже есть аккаунт?',
            'link': 'Войти'
        },
        'error': {
            'title': 'Не удалось изменить информацию о пользователе',
        }
    },
    'users': {
        'error': {
            'title': 'Не удалось загрузить пользователей'
        }
    },
    'posts': {
        'error': {
            'title': 'Не удалось загрузить посты'
        }
    },
    'user-posts': {
        'no-posts': 'Пользователь ещё не делал записей'
    },
    'comments': {
        'no-comments': 'На этом посте ёще нет коментариев'
    },
    'upload-photo': {
        'title': 'Загрузите изображение',
        'button': 'Отправить',
        'error': {
            'title': 'Не удалось загрузить фотографию'
        }
    },
    'footer': {
        'dark-theme': 'Тёмная тема'
    },
    'error-code': 'Код ошибки:',
    'mouths': {
        '0': 'января',
        '1': 'февраля',
        '2': 'марта',
        '3': 'апреля',
        '4': 'мая',
        '5': 'июня',
        '6': 'июля',
        '7': 'августа',
        '8': 'сентября',
        '9': 'октября',
        '10': 'ноября',
        '11': 'декабря',
    },
    'gender': {
        'man': 'Мужской',
        'woman': 'Женский',
    },
};
export default LOCALE_RU;

// {t('login.pageTitle')}
// const { t } = useTranslation();
