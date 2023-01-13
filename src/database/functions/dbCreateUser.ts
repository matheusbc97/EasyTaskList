import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import UserModel from '../models/UserModel';

interface DbCreateUserParams {
  name: string;
  theme: string;
  avatar: number;
}

export async function dbCreateUser(params: DbCreateUserParams) {
  await database.write(async () => {
    await database.get<UserModel>(TABLE_KEYS.USERS).create(data => {
      data.name = params.name;
      data.theme = params.theme;
      data.avatar = params.avatar;
    });
  });
}
