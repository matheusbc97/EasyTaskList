import React from 'react';
import {Avatar} from '@/modules/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

describe('Avatar Component', () => {
  it('Should render an Avatar', () => {
    render(<Avatar avatarNumber={0} />);
  });

  it('Should have the right style', async () => {
    const size = 55;

    const {findByTestId} = render(<Avatar avatarNumber={0} size={size} />);

    const element = await findByTestId(TEST_IDS.IMAGE_AVATAR);

    expect(element).toHaveStyle({
      width: size,
      height: size,
      borderRadius: size / 2,
    });
  });
});
