import React from 'react';
import axios, { AxiosInstance } from 'axios';

export interface IJeevesContext {
  jeeves: AxiosInstance;
}

const jeevesAxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? process.env.REACT_APP_JEEVES_DEV
      : (() => {
          throw new Error('No Jeeves API endpoint set for production!');
        })(),
});

const JeevesContext = React.createContext<IJeevesContext>({
  jeeves: jeevesAxiosInstance,
});

// Provider
export const JeevesProvider: React.FC = ({ children }) => {
  React.useEffect(() => {
    // These will be more involved when we have auth

    const addRequestInterceptor = () => {
      return jeevesAxiosInstance.interceptors.request.use(
        (config) => config,
        (error) => Promise.reject(error)
      );
    };

    const addResponseInterceptor = () => {
      return jeevesAxiosInstance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
      );
    };

    const removeRequestInterceptor = (id: number) => {
      jeevesAxiosInstance.interceptors.request.eject(id);
    };

    const removeResponseInterceptor = (id: number) => {
      jeevesAxiosInstance.interceptors.response.eject(id);
    };

    const requestId = addRequestInterceptor();
    const responseId = addResponseInterceptor();

    return () => {
      removeRequestInterceptor(requestId);
      removeResponseInterceptor(responseId);
    };
  }, []);

  return (
    <JeevesContext.Provider value={{ jeeves: jeevesAxiosInstance }}>
      {children}
    </JeevesContext.Provider>
  );
};

// Custom hook consumer API
export const useJeevesAPI = () => {
  const { jeeves } = React.useContext(JeevesContext);
  return jeeves;
};

// Render prop consumer API
export const JeevesAPIConsumer = JeevesContext.Consumer;

export const withJeevesAPI = (Component: any) => {
  const jeeves = useJeevesAPI();

  const C = (props: any) => {
    return <Component {...props} jeeves={jeeves} />;
  };

  return C;
};
