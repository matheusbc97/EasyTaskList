//import Api from '../library/api';
//import {AxiosPromise} from 'axios';
import {User} from '../library/models/User';

class AccountService {
  login(
    email: string,
  ): Promise<{
    data: {
      user: User;
      token: string;
    };
  }> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            data: {
              user: {name: 'teste', id: 123, email},
              token: '15ds1516sdf1',
            },
          }),
        700,
      );
    });
  }

  register(
    email: string,
  ): Promise<{
    data: {
      user: User;
      token: string;
    };
  }> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            data: {
              user: {id: 123, email},
              token: '15ds1516sdf1',
            },
          }),
        700,
      );
    });
  }
  /*login(login: string, password: string): AxiosPromise {
    return Api.post('api/auth', {
      login,
      password,
    });
  }*/
}

export default new AccountService();
