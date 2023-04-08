import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {Button} from '@/modules/shared/components';

interface CategoryColorBoxButtonProps {
  color1: string;
  color2: string;
  onColorPress: () => void;
  testID?: string;
}

function CategoryColorBoxButton({
  color1,
  color2,
  onColorPress,
  testID,
}: CategoryColorBoxButtonProps) {
  return (
    <Button
      testID={testID}
      key={`${color1}-${color2}`}
      onPress={onColorPress}
      style={{elevation: 5}}>
      <LinearGradient
        style={{
          width: 55,
          height: 55,
          borderRadius: 4,
          borderColor: '#e0e0e0',
          borderWidth: 1,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[color1, color2]}
      />
    </Button>
  );
}

export default CategoryColorBoxButton;
