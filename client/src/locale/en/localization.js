const LOCALE_EN = {
    'header': {
        'pages': {
            'users': 'Users',
            'posts': 'Posts'
        },
        'auth': {
            'login': 'Login',
            'registration': 'Registation',
        },
        'profile': {
            'logout': 'Logout'
        }
    },
    'login': {
        'pageTitle': 'Delta World — Login',
        'form': {
            'title': 'Login',
            'id': {
                'label': 'ID',
                'placeholder': 'Enter your ID',
                'error': 'Required field'
            },
            'button': 'Login',
            'no-account': 'Don\'t have an account yet?',
            'link': 'Register'
        },
        'error': {
            'title': 'Failed to login to Delta World',
            'errors': 'Invalid ID'
        }
    },
    'registration': {
        'pageTitle': 'Delta World — Registration',
        'form': {
            'title': 'Registration',
            'name': {
                'label': 'Name:',
                'placeholder': 'Enter your name',
                'error': 'Required field',
                'error--expected-firstname-and-lastname': 'First and last name are required',
                'error--name-must-more-2-symbols': 'First and last name must be at least 2 characters long',

            },
            'email': {
                'label': 'Email:',
                'error': 'Invalid email address'
            },
            'dateOfBirth': {
                'label': 'Date of Birth: ',
                'placeholder': 'DD.MM.YYYY',
                'error': 'Required field'
            },
            'gender': {
                'label': 'Gender: ',
                'man': 'Male',
                'woman': 'Female',
            },
            'phone': {
                'label': 'Phone number: ',
                'error': 'Phone number must be at least 5 digits'
            },
            'button': 'Registation',
            'has-account': 'Already have an account?',
            'link': 'Login'
        },
        'error': {
            'title': 'Failed to register',
        }
    },
    'user-info': {
        'pageTitle': 'Delta World — User',
        'gender': 'Gender: ',
        'dateOfBirth': 'Date of Birth: ',
        'dateOfRegistration': 'Date of registration: ',
        'email': 'Email: ',
        'phone': 'Phone number: ',
        'edit-profile': 'Edit',
        'undefined': 'Isn\'t specified'
    },
    'update-user': {
        'form': {
            'photo': {
                'delete': 'Delete photo',
                'upload': 'Update photo'
            },
            'name': {
                'label': 'Name:',
                'placeholder': 'Enter your name',
                'error': 'Required field',
                'error--expected-firstname-and-lastname': 'First and last name are required',
                'error--name-must-more-2-symbols': 'First and last name must be at least 2 characters long',
            },
            'dateOfBirth': {
                'label': 'Date of Birth: ',
                'placeholder': 'DD.MM.YYYY',
                'error': 'Required field'
            },
            'dateOfRegistration': 'Date of registration: ',
            'email': 'Email: ',
            'gender': {
                'label': 'Gender: '
            },
            'phone': {
                'label': 'Phone number: ',
                'error': 'Phone number must be at least 5 digits'
            },
            'button': 'Save',
        },
        'error': {
            'title': 'Failed to change user information',
        }
    },
    'users': {
        'error': {
            'title': 'Failed to load users'
        }
    },
    'posts': {
        'error': {
            'title': 'Failed to load posts'
        }
    },
    'user-posts': {
        'no-posts': 'User hasn\'t recorded yet'
    },
    'comments': {
        'no-comments': 'There are no comments on this post'
    },
    'upload-photo': {
        'title': 'Upload photo',
        'button': 'Send',
        'error': {
            'title': 'Could not upload photo'
        }
    },
    'footer': {
        'dark-theme': 'Dark theme'
    },
    'error-code': 'Error code:',
    'mouths': {
        '0': 'January',
        '1': 'February',
        '2': 'March',
        '3': 'April',
        '4': 'May',
        '5': 'June',
        '6': 'July',
        '7': 'August',
        '8': 'September',
        '9': 'October',
        '10': 'November',
        '11': 'December',
    },
    'gender': {
        'man': 'Male',
        'woman': 'Female',
    },
};
export default LOCALE_EN;
