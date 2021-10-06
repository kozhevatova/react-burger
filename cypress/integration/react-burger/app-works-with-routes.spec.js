before(function() {
  cy.visit('http://localhost:3000');
});

it('should load burger constructor', () => {
  cy.contains('Соберите бургер') ;
});

it('should load order feed', () => {
  cy.get('a').get('p').contains('Лента заказов').click();
  cy.contains('Лента заказов') ;
});

it('should open profile', function() {
  cy.get('a').contains('Личный кабинет').click();
  cy.contains('Вход') ;
});

it('should open register', () => {
  cy.get('a').contains('Зарегистрироваться').click();
  cy.contains('Зарегистрироваться');
});

it('should open login after register', () => {
  cy.get('a').contains('Войти').click();
  cy.contains('Вход');
});

it('should open password reset', () => {
  cy.get('a').contains('Восстановить пароль').click();
  cy.contains('Восстановление пароля');
});

it('should open login after reset', () => {
  cy.get('a').contains('Войти').click();
  cy.contains('Вход');
});