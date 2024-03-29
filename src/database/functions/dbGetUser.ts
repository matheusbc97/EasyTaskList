import {database} from '@/database/config';
import {User} from '@/modules/shared/models';
import {Q} from '@nozbe/watermelondb';

import {TABLE_KEYS} from '../constants/tableKeys';
import UserModel from '../models/UserModel';

export async function dbGetUser() {
  const userCollection = await database
    .get<UserModel>(TABLE_KEYS.USERS)
    .query(Q.take(1))
    .fetch();

  if (userCollection.length === 0) {
    throw Error('USER NOT LOGGED');
  }

  const userModel = userCollection[0];

  const user = {
    id: userModel.id,
    avatar: userModel.avatar,
    name: userModel.name,
    theme: userModel.theme,
  } as User;

  return user;
}
