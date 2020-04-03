import axios, { AxiosRequestConfig } from 'axios';

const { CancelToken } = axios;

const BASE_URL = 'http://localhost:8000/api';
// const BASE_URL = '/';

const buildUrl = (url: string, baseUrl: string) => {
  if (baseUrl === '/') {
    return url;
  }

  const segment = url.toLowerCase().split('://')[0];

  if (segment === 'http' || segment === 'https') {
    return url;
  }

  return url.substr(0, 1) === '/' ? baseUrl + url : `${baseUrl}/${url}`;
};

const cancelSources: any = {
  byId: {},
  byUrl: {},
};

/**
 * requestId - для отмены запроса если их несколько и на разные url
 */
type ConfigApi = Partial<AxiosRequestConfig> & { requestId?: string };

const request = async (config: ConfigApi) => {
  const url = buildUrl(config.url || '', BASE_URL);
  console.log('url', config.url);
  const { requestId, ...restConfig } = config;
  const cancelSource = CancelToken.source();

  if (requestId) {
    cancelSources.byId[requestId] = cancelSource;
  } else {
    cancelSources.byUrl[url] = cancelSource;
  }

  try {
    const response = await axios({
      ...restConfig,
      url,
      cancelToken: cancelSource.token,
    });

    return {
      ...response,
      json: async () => response.data,
    };
  } catch (err) {
    throw err;
  }
};

type CancelRequest = {
  id?: string,
  url?: string
};
const cancelRequest = ({ id, url }: CancelRequest) => {
  let source;

  if (id) {
    source = cancelSources.byId[id];
  } else if (url) {
    source = cancelSources.byUrl[url];
  }

  if (!source) return;

  source.cancel();
};

export default {
  request,
  cancelRequest,
  isCancel: axios.isCancel,
  get: (params: ConfigApi) => request({ ...params, method: 'GET' }),
  post: (params: ConfigApi) => request({ ...params, method: 'POST' }),
  put: (params: ConfigApi) => request({ ...params, method: 'PUT' }),
  delete: (params: ConfigApi) => request({ ...params, method: 'DELETE' }),
  options: (params: ConfigApi) => request({ ...params, method: 'OPTIONS' }),
};
