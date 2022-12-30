import {showMessage} from 'react-native-flash-message';
import {uploadImage} from '../api';

export const uploadFile = async image => {
  let formData = new FormData();
  formData.append('fileName', {
    uri: image?.uri,
    type: image?.type,
    name: 'image.jpg',
  });

  try {
    let {data} = await uploadImage(formData);

    return {
      uri: data,
      imgname: new Date(),
    };
  } catch (error) {
    //console.log(error.response);
    showMessage({
      type: 'danger',
      message: 'Oops! Something went wrong',
      description: 'Failed to upload the image. Please try again later',
    });
    return false;
  }
};
