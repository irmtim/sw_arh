export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string, straight: boolean = false) {
  const current = getCurrentUrl(pathname)

  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (!straight && current.indexOf(url) > -1) {
    return true
  }

  return false
}
