import { Handler } from '@netlify/functions';
import axios, { AxiosError, AxiosRequestHeaders, Method } from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_HOST;

const handler: Handler = async req => {
  const { body, headers, httpMethod, path } = req;

  try {
    const { data, status } = await axios(path, {
      baseURL: BASE_URL,
      method: httpMethod as Method,
      headers: headers as AxiosRequestHeaders,
      data: body,
    });

    return {
      statusCode: status,
      body: JSON.stringify(data),
    };
  } catch (e: unknown) {
    const errorData = (e as AxiosError)?.response?.data;
    const status = (e as AxiosError)?.response?.status || 500;

    return {
      statusCode: status,
      body: JSON.stringify(errorData),
    };
  }
};

export { handler };
