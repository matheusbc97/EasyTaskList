describe('Create Account Test', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  /*beforeEach(async () => {
    await device.reloadReactNative();
  });*/

  it('should show welcome screen', async () => {
    await expect(element(by.id('WelcomeScreenWrapper'))).toBeVisible();
  });

  it('should show create account screen', async () => {
    await element(by.id('WelcomeCreateAccountButton')).tap();
    await expect(element(by.id('CreateAccountScreenScroll'))).toBeVisible();

    //await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should create an user', async () => {
    await element(by.id('EmailInput')).tap();
    await element(by.id('EmailInput')).typeText('test_e2e19@test.com');

    await element(by.id('newPasswordInput')).tap();
    await element(by.id('newPasswordInput')).typeText('123456');


    await element(by.id('confirmNewPasswordInput')).tap();
    await element(by.id('confirmNewPasswordInput')).typeText('123456');

    await element(by.id('IHaveReadPrivacyPolicyCheckInput')).tap();

    await element(by.id('RegisterSendButton')).tap();

    //await new Promise((resolve) => setTimeout(resolve, 4000))
   /// await element(by.id('RegisterAdvanceButton')).tap();
  });

  /*
  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });*/
});
