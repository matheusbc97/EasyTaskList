//import {Toast} from 'native-base';

import {loaderHandler} from '@shared/components/LoadingHandler';
import {showToast} from '@shared/components/Toast';

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado';
    case 'auth/email-already-exists':
      return 'O email já existe';
    case 'auth/invalid-email':
      return 'email inválido';
    case 'auth/invalid-password':
      return 'Senha inválida';
    case 'storage/object-not-found':
      return 'Recurson não encontrado';
    case 'storage/unauthenticated':
      return 'usuário não autenticado';
    case 'storage/retry-limit-exceeded':
      return 'A requisição demorou tempo demais, tente novamente';
    case 'storage/invalid-url':
      return 'Recurson não encontrado';
    default:
      return 'Ocorreu um erro inesperado';
  }
};

/**
 * handleErrorMessage
 * * Verifica qual mensagem de erro foi retornada numa requisição
 * @param {Object} error Objeto de retorno de uma requisição
 */
export function handleErrorMessage(error: any) {
  loaderHandler.hideLoader();
  console.log('error', error);
  console.log('Message', error.message);
  console.log('code', error.code);
  console.log('name', error.name);
  console.log('namespace', error.namespace);
  console.log('stack', error.stack);

  let message = getErrorMessage(error.code);

  showToast({
    text: message,
    type: 'danger',
  });
}
