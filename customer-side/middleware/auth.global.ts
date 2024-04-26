export default defineNuxtRouteMiddleware((to, from) => {
  const isLogin = useIsLogin();

  if (isLogin.value && (to.path == "/login" || to.path == "/register")) {
    return navigateTo("/");
  }
});
