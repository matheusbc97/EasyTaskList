import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {expect} from 'detox';
import * as themes from '../src/assets/themes';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('Create User', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show welcome screen', async () => {
    await expect(element(by.id('WelcomeScreenWrapper'))).toBeVisible();
  });

  it('should go to choose theme sub-screen', async () => {
    await element(by.id('CreateNewUserButton')).tap();
  });

  it('should choose theme', async () => {
    const themeKeys = Object.keys(themes);
    const themeBoxId = `ThemeBox-${
      themeKeys[randomIntFromInterval(0, themeKeys.length - 1)]
    }`;
    await element(by.id(themeBoxId)).tap();
    // await element(by.id('CreateNewUserButton')).tap();
  });

  it('should go to choose name sub-screen', async () => {
    await element(by.id('ChooseThemeAdvanceButton')).tap();
  });

  const userName = 'Tester';

  it('should write the name', async () => {
    await element(by.id('NewPasswordInput')).tap();

    await element(by.id('NewPasswordInput')).typeText(userName);
  });

  it('should go to choose avatar sub-screen', async () => {
    await element(by.id('ChooseNameAdvanceButton')).tap();
  });

  it('should choose avatar', async () => {
    const avatarId = TEST_IDS.AVATAR_GRID_AVATAR(randomIntFromInterval(0, 7));
    await element(by.id(avatarId)).tap();
  });

  it('should finish user creation and go to home', async () => {
    await element(by.id('SaveUserConfigurationSaveButton')).tap();

    await expect(element(by.id('HeaderUserNameText'))).toBeVisible();
  });
});
