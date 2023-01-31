export function validateField(fieldName: string, value: string) {
  switch (fieldName) {
    case 'name':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return;

    case 'date':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return;
    case 'time':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return;

    case 'title':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return;
    case 'category':
      if (!value) {
        return 'Campo Obrigatório';
      }

      return;

    default:
      return;
  }
}
