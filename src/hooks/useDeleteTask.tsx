import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {removeTaskById} from '@/store/tasks';
import {deleteTaskById} from '@/shared/firebase/deleteTaskById';
import {loaderHandler} from '@/shared/components/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {showToast} from '@shared/components/Toast';

const useDeleteTask = () => {
  const dispatch = useDispatch();

  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        loaderHandler.showLoader();

        await deleteTaskById(taskId);

        dispatch(removeTaskById(taskId));

        showToast({
          text: 'Tarefa deletada com sucesso',
          type: 'success',
        });
      } catch (error) {
        handleErrorMessage(error);
      }

      loaderHandler.hideLoader();
    },
    [dispatch],
  );

  return deleteTask;
};

export default useDeleteTask;
