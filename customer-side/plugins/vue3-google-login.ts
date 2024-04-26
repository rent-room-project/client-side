import vue3GoogleLogin from "vue3-google-login";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId:
      "928738064777-3fcusk6nmk88pknlmlr1i8nlvr9bceen.apps.googleusercontent.com",
  });
});
