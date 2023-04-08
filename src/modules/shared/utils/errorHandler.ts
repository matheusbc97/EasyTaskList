import {showToast} from '@/modules/shared/components/Toast';

export function handleErrorMessage(error: any) {
  console.log('error', error);
  console.log('Message', error.message);
  console.log('code', error.code);
  console.log('name', error.name);
  console.log('namespace', error.namespace);
  console.log('stack', error.stack);

  const message = 'Ocorreu um erro inesperado';

  showToast({
    text: message,
    type: 'danger',
  });
}
