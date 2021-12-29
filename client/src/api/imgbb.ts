import { IMGBB_KEY } from '../constants/api/imgbb';

export function UploadImage(file: File, callback?: any) {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const formData: any = new FormData();
        formData.set('key', IMGBB_KEY);
        formData.set('image', reader.result.replace(/^.*,/, ''));

        fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(callback);
    };
}
