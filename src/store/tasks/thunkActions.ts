import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTime} from 'date-fns';

import {handleErrorMessage} from '@shared/utils/errorHandler';
import {createUserTask, getUserTasks, updateUserTask} from '@shared/firebase';
import {Task, Category} from '@shared/models';
import {selectUser} from '@store/account/user';
import {RootState} from '..';
import {categoryListSelectors} from '@store/categories';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {showToast} from '@shared/components/Toast';

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
  date: Date;
  category: Category;
}

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (
    {category, date, ...rest}: CreateTaskDTO,
    {getState},
  ): Promise<Task> => {
    try {
      loaderHandler.showLoader();
      const user = selectUser(getState() as RootState);
      const categories = categoryListSelectors.selectAll(
        getState() as RootState,
      );

      const taskId = await createUserTask(user!.uid, {
        categoryId: category!.id,
        date,
        ...rest,
        done: false,
      });

      loaderHandler.hideLoader();

      return {
        id: taskId,
        category: categories.find((item) => item.id === category.id),
        done: false,
        date: getTime(date),
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
  date: Date;
  category: Category;
}

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    {category, date, ...rest}: UpdateTaskDTO,
    {getState},
  ): Promise<Task> => {
    try {
      loaderHandler.showLoader();
      const user = selectUser(getState() as RootState);
      const categories = categoryListSelectors.selectAll(
        getState() as RootState,
      );

      await updateUserTask(user!.uid, {
        categoryId: category!.id,
        ...rest,
        date,
        done: false,
      });

      loaderHandler.hideLoader();

      return {
        category: categories.find((item) => item.id === category.id),
        done: false,
        date: getTime(date),
        ...rest,
      };
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);

interface UpdateTaskStatusDTO {
  id: string;
  done: boolean;
  recursive?: boolean;
}

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async (
    updates: UpdateTaskStatusDTO,
    {getState, dispatch},
  ): Promise<UpdateTaskStatusDTO> => {
    try {
      loaderHandler.showLoader();
      const user = selectUser(getState() as RootState);

      await updateUserTask(user!.uid, updates);

      loaderHandler.hideLoader();

      if (!updates.recursive) {
        showToast({
          type: 'success',
          text: updates.done
            ? 'Tarefa Marcada como feita!'
            : 'Tarefa marcada como não feita',
          buttonLabel: 'desfazer',
          buttonOnPress: () =>
            dispatch(
              updateTaskStatus({
                id: updates.id,
                done: !updates.done,
                recursive: true,
              }),
            ),
        });
      }

      return updates;
    } catch (error) {
      handleErrorMessage(error);
      throw new Error(error);
    }
  },
);
