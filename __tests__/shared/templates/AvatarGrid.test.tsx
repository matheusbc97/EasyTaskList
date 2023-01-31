import AvatarGrid from '@/shared/templates/AvatarGrid';
import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';
import {avatarSources} from '@/shared/components/Avatar';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('AvatarGrid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an AvatarGrid', () => {
    render(<AvatarGrid onAvatarPress={() => {}} />);
  });

  it('Should fire onAvatarPress', async () => {
    const onAvatarPress = jest.fn();
    const {findByTestId} = render(<AvatarGrid onAvatarPress={onAvatarPress} />);

    const promises = avatarSources.map(async (_, index) => {
      const element = await findByTestId(TEST_IDS.AVATAR_GRID_AVATAR(index));

      fireEvent.press(element);

      expect(onAvatarPress).toHaveBeenCalledWith(index);
    });

    await Promise.all(promises);
  });
});
