'use strict';

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

const Route = use('Route');

Route.on('/').render('welcome');

Route.resource('/contacts', 'ContactController').except(['create', 'edit']);

Route.group('collection', () => {
  Route.resource('/pledge-level', 'PledgeLevelController')
    .except(['create', 'edit']);
  Route.resource('/pledge-levels', 'PledgeLevelController')
    .except(['create', 'edit']);

  Route.resource('/projects', 'ProjectController')
    .except(['create', 'edit']);
  Route.resource('/project', 'ProjectController')
    .except(['create', 'edit']);


  Route.resource('/basic/pledge-levels', 'BasicPledgeLevelController')
    .except(['create', 'edit']);
  Route.resource('/basic/projects', 'BasicProjectController')
    .except(['create', 'edit']);
}).prefix('/:collection');
