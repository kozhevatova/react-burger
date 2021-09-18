export const BASE_URL = "https://norma.nomoreparties.space/api";

export const ingredientDetailsTitle = "Детали ингредиента";
export const topBunLabel = " (верх)";
export const bottomBunLabel = " (низ)";

export const loginLinks = [
  {
    text: "Вы - новый пользователь?",
    path: "/register",
    linkText: "Зарегистрироваться",
  },
  {
    text: "Забыли пароль?",
    path: "/forgot-password",
    linkText: "Восстановить пароль",
  },
];

export const registerLinks = [
  {
    text: "Уже зарегистрированы?",
    path: "/login",
    linkText: "Войти",
  },
];

export const forgotPasswordLinks = [
  {
    text: "Вспомнили пароль?",
    path: "/login",
    linkText: "Войти",
  },
];

export const loginTitles = {
  formTitle: "Вход",
  buttonTitle: "Войти",
};

export const registerTitles = {
  formTitle: "Регистрация",
  buttonTitle: "Зарегистрироваться",
};

export const forgotPasswordTitles = {
  formTitle: "Восстановление пароля",
  buttonTitle: "Восстановить",
};

export const resetPasswordTitles = {
  formTitle: "Восстановление пароля",
  buttonTitle: "Сохранить",
};

export const profileMenuLinks = [
  {
    text: 'Профиль',
    link: '/profile'
  },
  {
    text: 'История заказов',
    link: '/'
  },
  {
    text: 'Выход',
    link: '/profile'
  }
]