import {
  FC,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import { WithChildren } from 'shared'
import { getUserByToken, loginPost } from './_requests'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  login: (userName: string, password: string) => void
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  login: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  const login = async (userName: string, password: string) => {
    try {
      const {data: auth} = await loginPost(userName, password)
      saveAuth(auth)
      const {data: user} = await getUserByToken(auth.api_token)
      setCurrentUser(user)
      
    } catch (error) {
      console.error(error)
      saveAuth(undefined)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, login}}>
      {children}
    </AuthContext.Provider>
  )
}



export {AuthProvider, useAuth}
