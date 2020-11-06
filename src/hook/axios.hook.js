import { useState, useEffect, useMemo, useCallback } from 'react';
import qs from 'qs';

import { getBaseRequest } from 'configureAxios';

export const useQuery = ({ url, params = {}, skip = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);
  const extractParams = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    if (!!skip) {
      return;
    }

    setLoading(true);

    const params = JSON.parse(extractParams);

    getBaseRequest().then(axiosReq => {
      axiosReq({
        url,
        method: 'GET',
        params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      })
        .then(response => {
          if (response.status === 200) {
            setData(response.data);
          }
          setErrors(null);
          setLoading(false);
        })
        .catch(error => {
          setErrors(error);
          setData(null);
          setLoading(false);
        });
    });
  }, [extractParams, url, forceRequest, skip]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};

export const useMutation = ({ url, method = 'POST' }) => {
  const mutate = useCallback(
    async data => {
      const dataRequest = data ? data : null;
      const baseRequest = await getBaseRequest();

      return baseRequest[method.toLocaleLowerCase()](url, dataRequest);
    },
    [method, url],
  );

  return [mutate];
};
