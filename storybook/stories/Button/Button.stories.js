import {action} from '@storybook/addon-actions';
import {text, boolean, object} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {Button} from '@/shared/components';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button
      style={object('Style', {
        padding: 5,
        borderRadius: 3,
      })}
      disabled={boolean('Disabled', false)}
      onPress={action('clicked-text')}>
      <Text>{text('Label', 'Press me')}</Text>
    </Button>
  ))
  .add('with text disabled', () => (
    <Button disabled onPress={action('clicked-text')}>
      <Text>{text('Label', 'Press me')}</Text>
    </Button>
  ));
