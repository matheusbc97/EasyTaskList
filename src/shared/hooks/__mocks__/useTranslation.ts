const mockedTranslate = jest.fn(() => 'teste');

export const useTranslation = () => ({
  translation: mockedTranslate,
});
