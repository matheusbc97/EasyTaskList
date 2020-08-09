import {createAsyncThunk} from '@reduxjs/toolkit';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {createUserTask} from '@shared/firebase';
import {Task} from '@shared/models';
import {selectUser} from '@store/account/user';
import {RootState} from '..';

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id'>, {getState}): Promise<Task> => {
    try {
      const user = selectUser(getState() as RootState);

      await createUserTask(user!.uid, task);

      return task;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
