//import {Toast} from 'native-base';

import {loaderHandler} from '../../library/components/LoadingHandler';
import {showToast} from '../../library/components/Toast';

const getClientErrorMessage = (error: any) => {
  if (error.message) {
    return error.message;
  } else if (error.data && error.data.message) {
    return error.data.message;
  } else if (error.data && error.data.Message) {
    return error.data.Message;
  } else if (typeof error.data === 'string') {
    return error.data;
  } else if (
    error.data &&
    error.data.error &&
    typeof error.data.error === 'string'
  ) {
    return error.data.error;
  } else {
    return '';
  }
};

/**
 * handleErrorMessage
 * * Verifica qual mensagem de erro foi retornada numa requisição
 * @param {Object} error Objeto de retorno de uma requisição
 */
export function handleErrorMessage(error: any) {
  loaderHandler.hideLoader();
  let message = '';
  if (error.message === 'Network Error') {
    message = 'sem conexão com a internet';
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status >= 400 && error.response.status <= 499) {
      if (error.response.data) {
        message = getClientErrorMessage(error.response.data);
      }
    }
    console.log('[Error Data]', error.response.data);
    console.log('[Error Status]', error.response.status);
    console.log('[Error Headers]', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    if (error.code === 'ECONNABORTED') {
      message = 'O servidor não respondeu a tempo';
    } else {
      console.log('[Error Request]', 'no response was received', error.request);
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error setting up the request', error.message);
  }
  console.log(error.config);

  if (message === '') {
    message = 'Ocorreu um erro inesperado';
  }

  showToast({
    text: message,
  });
}
