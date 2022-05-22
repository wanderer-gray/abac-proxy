export const AuthAPI = {
  checkAuth: () =>
    http('auth/checkAuth')
      .method('get'),

  logIn: (nickname, password) =>
    http('auth/logIn')
      .method('post')
      .body({
        nickname,
        password
      }),

  logOut: () =>
    http('auth/logOut')
      .method('delete')
}
