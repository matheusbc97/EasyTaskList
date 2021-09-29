import {getPrivacyPolicy as fbGetPrivacyPolicy} from '@/shared/firebase';
import {handleErrorMessage} from '@/shared/utils/errorHandler';
import {useState, useCallback} from 'react';

import {FetchState} from '@/shared/models';

const usePrivacyPolicy = () => {
  const [fetchState, setFetchState] = useState<FetchState>({
    hasError: false,
    isLoading: true,
  });
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  const getPrivacyPolicy = useCallback(async () => {
    try {
      const _privacyPolicy = await fbGetPrivacyPolicy();

      setPrivacyPolicy(_privacyPolicy);
      setFetchState({
        hasError: false,
        isLoading: false,
      });
    } catch (error) {
      setFetchState({
        hasError: false,
        isLoading: false,
      });
      handleErrorMessage(error);
    }
  }, []);

  return {
    privacyPolicy,
    fetchState,
    getPrivacyPolicy,
  };
};

export default usePrivacyPolicy;
