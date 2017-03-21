'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome');

Route.group('collection', () => {
  Route.resource('/cars', 'CarController')
    .except(['create', 'edit']);
  Route.resource('/brands', 'BrandController')
    .except(['create', 'edit']);
})
// .prefix('/:collection');
