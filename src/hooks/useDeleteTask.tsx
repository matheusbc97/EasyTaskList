import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {removeTaskById} from '@/store/tasks';
import {fullScreenLoader} from '@/shared/components/loadings/FullScreenLoader';
import {handleErrorMessage} from '@/shared/utils/errorHandler';
import {showToast} from '@/shared/components/Toast';

const useDeleteTask = () => {
  const dispatch = useDispatch();

  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        fullScreenLoader.showLoader();

        dispatch(removeTaskById(taskId));

        showToast({
          text: 'Tarefa deletada com sucesso',
          type: 'success',
        });
      } catch (error) {
        handleErrorMessage(error);
      }

      fullScreenLoader.hideLoader();
    },
    [dispatch],
  );

  return deleteTask;
};

export default useDeleteTask;
