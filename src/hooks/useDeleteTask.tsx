import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {removeTaskById} from '@/store/tasks';
import {loaderHandler} from '@shared/components/loadings/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {showToast} from '@shared/components/Toast';

const useDeleteTask = () => {
  const dispatch = useDispatch();

  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        loaderHandler.showLoader();

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
