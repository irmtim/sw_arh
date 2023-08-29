import axios, { AxiosResponse } from 'axios'
import {AuthModel, UserModel} from '../../../shared/lib/auth/_models'

const API_URL = process.env.REACT_APP_API_URL

const REGISTER_URL = `${API_URL}/auth/register`
const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot_password`
const IS_EMAIL_UNIQUE_POST_URL = `${API_URL}/auth/is_email_unique`
const CONFIRM_EMAIL_POST_URL = `${API_URL}/auth/confirm_email`

// Server should return AuthModel
export function register(
  Email: string,
  FullName: string,
  Password: string,
  ConfirmPassword: string
) {
  return axios.post(REGISTER_URL, {
    Email,
    FullName,
    Password,
    ConfirmPassword,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export const isEmailUniquePost = (email: string) : Promise<boolean> => {
  return axios
    .post(IS_EMAIL_UNIQUE_POST_URL, JSON.stringify(email), { headers:{'Content-Type': 'application/json; charset=utf-8'} })
    .then((d: AxiosResponse) => d.status === 200 && d.data)
}

export const confirmEmailPost = (userId: string, code: string) : Promise<boolean> => {
  const data = { userId, code }

  return axios
    .post(CONFIRM_EMAIL_POST_URL, JSON.stringify(data), { headers:{'Content-Type': 'application/json; charset=utf-8'} })
    .then((d: AxiosResponse) => d.status === 200 && d.data === true)
}
