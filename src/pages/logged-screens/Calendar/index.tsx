import React from 'react';
import {View} from 'react-native';
import {Calendar as RNCalendar} from 'react-native-calendars';
import {useSelector} from 'react-redux';

import {Text, ScreenWrapper} from '../../../library/components';
import {selectAppTheme} from '../../../store/configs';

export default function Calendar() {
  const appTheme = useSelector(selectAppTheme);

  return (
    <ScreenWrapper style={{backgroundColor: appTheme.aboveBackground}}>
      <View
        style={{
          margin: 10,
          borderBottomWidth: 1,
          paddingVertical: 5,
          borderBottomColor: appTheme.secondaryTextColor,
        }}>
        <Text type="title-big">CALENDÁRIO</Text>
      </View>
      <RNCalendar
        theme={{
          //arrowColor: 'white',
          'stylesheet.calendar.header': {
            //header: styles.calendarHeader,
            //monthText: styles.monthText,
            //dayHeader: styles.dayHeader,
          },
          //backgroundColor: appTheme.background,
          calendarBackground: appTheme.aboveBackground,
        }}
      />
    </ScreenWrapper>
  );
}
