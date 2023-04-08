import {AuthenticateStackPageProps} from '@/shared/types/AuthenticateStackPageProps';
import {useEffect, useState} from 'react';
import {View} from 'react-native';

const Teste = () => {
  const StorybookUIRoot = require('../../../../../storybook').default;

  return <StorybookUIRoot />;
};

export default function StorybookPage({}: AuthenticateStackPageProps<'Storybook'>) {
  const [renderStoryBook, setRenderStoryBook] = useState(false);

  useEffect(() => {
    setRenderStoryBook(true);
  }, []);

  return <View style={{flex: 1}}>{renderStoryBook && <Teste />}</View>;
}
