import {createAsyncThunk} from '@reduxjs/toolkit';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {createUserTask, getUserTasks, updateUserTask} from '@shared/firebase';
import {Task, Category} from '@shared/models';
import {selectUser} from '@store/account/user';
import {RootState} from '..';
import {categoryListSelectors} from '@store/categories';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, {getState}): Promise<Task[]> => {
    try {
      const categories = categoryListSelectors.selectAll(
        getState() as RootState,
      );

      const databaseTasks = await getUserTasks();

      return databaseTasks.map(({categoryId, ...rest}) => ({
        category: categories.find((category) => category.id === categoryId),
        ...rest,
      }));
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);

interface CreateTaskDTO {
  title: string;
  description: string;
  date: string;
  category: Category;
}

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({category, ...rest}: CreateTaskDTO, {getState}): Promise<Task> => {
    try {
      const user = selectUser(getState() as RootState);
      const categories = categoryListSelectors.selectAll(
        getState() as RootState,
      );

      const taskId = await createUserTask(user!.uid, {
        categoryId: category!.id,
        ...rest,
        done: false,
      });

      return {
        id: taskId,
        category: categories.find((item) => item.id === category.id),
        done: false,
        ...rest,
      };
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);

interface UpdateTaskDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Category;
}

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({category, ...rest}: UpdateTaskDTO, {getState}): Promise<Task> => {
    try {
      const user = selectUser(getState() as RootState);
      const categories = categoryListSelectors.selectAll(
        getState() as RootState,
      );

      await updateUserTask(user!.uid, {
        categoryRef: `/users/73tLB56OgrOjSApFhZUFKyUzJaA3/categories/${
          category!.id
        }`,
        ...rest,
        done: false,
      });

      return {
        category: categories.find((item) => item.id === category.id),
        done: false,
        ...rest,
      };
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
