export function validateField(fieldName: string, value: string) {
  switch (fieldName) {
    case 'name':
      if (!value) {
        return emptyText('nome');
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

type FormErrors = Record<string, string>;

export function validateAll(
  form: any,
  notValidate = [],
  _recursiveKey?: string | null | undefined,
): [FormErrors, boolean] {
  let formErrors: FormErrors = {};
  let formIsValid = true;

  Object.keys(form).map(key => {
    if (typeof form[key] === 'object') {
      let recursiveKey = _recursiveKey ? `${key}.${_recursiveKey}` : key;

      formErrors = {
        ...formErrors,
        ...validateAll(form[key], notValidate, recursiveKey)[0],
      };
    } else {
      const newKey = _recursiveKey ? `${_recursiveKey}.${key}` : key;

      if (!notValidate.find(fieldName => fieldName === newKey)) {
        const error = validateField(newKey, form[key]);

        if (formIsValid && error) {
          formIsValid = false;
        }

        formErrors[newKey] = error ?? '';
      }
    }
  });

  return [formErrors, formIsValid];
}

function validateEmail(email: string) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function emptyText(value = '') {
  return `Campo ${value} obrigatório`;
}
