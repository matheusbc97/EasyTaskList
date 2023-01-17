const mockedTranslate = jest.fn(() => 'teste');

export default () => ({
  translation: mockedTranslate,
});
