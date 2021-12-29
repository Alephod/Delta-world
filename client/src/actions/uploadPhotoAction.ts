import { Dispatch } from 'redux';
import { UploadImage } from '../api/imgbb';

const uploadAction: any = () => ({
    type: 'UPLOAD_PHOTO'
});
const uploadSuccessAction: any = (href: string) => ({
    href: href,
    type: 'UPLOAD_PHOTO_SUCCESS',
});
const uploadErrorAction: any = (errorObj: any) => ({
    type: 'UPLOAD_PHOTO_ERROR',
    error: errorObj,
});

export const uploadPhotoAction: any = (file: File) => (dispatch: Dispatch) => {
    dispatch(uploadAction());
    UploadImage(file, (resp: any) => {
        if (resp.status !== 200)
            dispatch(uploadErrorAction({ code: resp.status_code, data: resp.error.message }));
        else
            dispatch(uploadSuccessAction(resp.data.display_url));
    });
};
