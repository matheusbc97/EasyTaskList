import {getPrivacyPolicy} from '@/shared/firebase';
import {handleErrorMessage} from '@/shared/utils/errorHandler';
import {useState, useEffect} from 'react';

import {FetchState} from '@/shared/models';

const usePrivacyPolicy = () => {
  const [fetchState, setFetchState] = useState<FetchState>({
    hasError: false,
    isLoading: true,
  });
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');

  useEffect(() => {
    async function getAsync() {
      try {
        const _privacyPolicy = await getPrivacyPolicy();

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
    }

    getAsync();
  }, []);

  return {
    privacyPolicy,
    fetchState,
  };
};

export default usePrivacyPolicy;
