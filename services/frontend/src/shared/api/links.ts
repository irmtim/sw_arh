
class APP_URL {
  static INDEX = '/'

  // static HOME = `${process.env.PUBLIC_URL}/switches`

  static AUTH_LOGIN = `${process.env.PUBLIC_URL}/auth`
  // static AUTH_REGISTRATION = `${process.env.PUBLIC_URL}/auth/registration`
  // static AUTH_FORGOT_PASSWORD = `${process.env.PUBLIC_URL}/auth/forgot-password`

  // static PROFILE_OVERVIEW = `${process.env.PUBLIC_URL}/profile`
  // static PROFILE_CHANGEPASSWORD = `${process.env.PUBLIC_URL}/profile/changepassword`
  // static PROFILE_NOTIFICATIONS = `${process.env.PUBLIC_URL}/profile/motifications`
  
  static ERROR_404 = `${process.env.PUBLIC_URL}/error/404`
  static ERROR_403 = `${process.env.PUBLIC_URL}/error/403`

  static SWITCHES_INDEX = `${process.env.PUBLIC_URL}/switches`
  static SWITCHES_VIEW = (id: string) => `${process.env.PUBLIC_URL}/switches/${id}`

  
}


export {
  APP_URL,
}