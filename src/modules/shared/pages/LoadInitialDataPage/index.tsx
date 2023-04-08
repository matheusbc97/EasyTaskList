import React, {useLayoutEffect} from 'react';
import {LoadingIndicator} from '@/modules/shared/components';
import {dbGetUser} from '@/database/functions/dbGetUser';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '@/store/configs';
import {setUser} from '@/store/account/user';

export default function LoadInitialDataPage() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dbGetUser()
      .then(user => {
        dispatch(setUser(user));
        dispatch(setIsLogged(true));
      })
      .catch(() => {
        dispatch(setIsLogged(false));
      });
  }, [dispatch]);

  return <LoadingIndicator />;
}
