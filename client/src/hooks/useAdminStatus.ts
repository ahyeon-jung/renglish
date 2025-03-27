import { useEffect, useState } from 'react';

import adminAction from '@/app/_actions/auth/admin';
import { getTokenInClient } from '@/utils/cookie';
import useSWR from 'swr';

const useAdminStatus = () => {
  const [token, setToken] = useState(getTokenInClient());

  const { data: isAdmin, mutate } = useSWR(['adminStatus', token], adminAction, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    const checkTokenChange = () => {
      const newToken = getTokenInClient();
      if (newToken !== token) {
        setToken(newToken);
        mutate();
      }
    };

    const interval = setInterval(checkTokenChange, 3000);

    return () => clearInterval(interval);
  }, [token, mutate]);

  return { isAdmin };
};

export default useAdminStatus;
