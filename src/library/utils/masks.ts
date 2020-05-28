export function maskDate(value: string, oldValue: string) {
  if (!value) {
    return '';
  }

  if (oldValue.length < value.length) {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.substr(0, 8);
    }
    return formataCampo('00/00/0000', value);
  }

  return value;
}

function formataCampo(Mascara: string, value: string) {
  if (!value) {
    return '';
  }

  var boleanoMascara;

  var exp = /-|\.|\/|\(|\)|,| /g;
  var campoSoNumeros = value.replace(exp, '');

  var posicaoCampo = 0;
  var NovoValorCampo = '';
  var TamanhoMascara = campoSoNumeros.length;

  for (let i = 0; i <= TamanhoMascara; i++) {
    boleanoMascara =
      Mascara.charAt(i) === '-' ||
      Mascara.charAt(i) === '.' ||
      Mascara.charAt(i) === '/';
    boleanoMascara =
      boleanoMascara ||
      Mascara.charAt(i) === '(' ||
      Mascara.charAt(i) === ')' ||
      Mascara.charAt(i) === ' ';
    if (boleanoMascara) {
      NovoValorCampo += Mascara.charAt(i);
      TamanhoMascara++;
    } else {
      NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
      posicaoCampo++;
    }
  }
  return NovoValorCampo;
}
