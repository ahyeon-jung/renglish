import { PATHS } from "@/constants/path"
import { REDIRECT_SEARCH } from "@/constants/search"

export const goToLoginWithRedirect = (pathname: string) => {
  return `${PATHS.AUTH.LOGIN}?${REDIRECT_SEARCH}=${encodeURIComponent(pathname)}`
}

export const goToLogoutWithRedirect = (pathname: string) => {
  return `${PATHS.AUTH.LOGOUT}?${REDIRECT_SEARCH}=${encodeURIComponent(pathname)}`
}