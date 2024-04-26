export default function useIsLogin() {
  return useState("isLogin", () => !!localStorage.access_token);
}
