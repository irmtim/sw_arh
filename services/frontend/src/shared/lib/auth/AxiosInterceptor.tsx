import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "./AuthHelpers";
import { APP_URL } from "shared/api";
import { WithChildren, LocationState } from "shared";

type Props = WithChildren & {

}

const AxiosInterceptor = ({children}: Props) => {
  const [isSet, setIsSet] = useState(false)
  const navigate = useNavigate()
  const {pathname} = useLocation()

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response
    }

    const resErrInterceptor = (error: any) => {
      switch (error.response?.status) {
        case 401:
          navigate(APP_URL.AUTH_LOGIN, {state: {from: pathname} as LocationState})
          return Promise.resolve()
        case 403:
          navigate(APP_URL.ERROR_403, {state: {from: pathname} as LocationState})
          return Promise.resolve()
      }
  
      return Promise.reject(error);
    }

    const axiosAny = axios as any

    const reqInterseptor = (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`
      }

      return config
    }
    const reqErrInterseptor = (err: any) => {      
      Promise.reject(err)
    }

    axiosAny.defaults.headers.Accept = 'application/json'

    const interceptorRequest = axiosAny.interceptors.request.use(reqInterseptor, reqErrInterseptor)

    const interceptorResponse = axiosAny.interceptors.response.use(resInterceptor, resErrInterceptor)

    setIsSet(true)

    // return () => {
    //   axiosAny.interceptors.response.eject(interceptorResponse)
    //   axiosAny.interceptors.request.eject(interceptorRequest)
    // }
  }, [navigate])

  return (
    <>
      {isSet && children}
    </>
  );
};

export {AxiosInterceptor}