Router.configure( {
  layoutTemplate: 'layout'
} );

Router.map( function() {
  this.route( 'home', {
    path: '/',
    fastRender: true
  } );

  this.route( 'projects.none', {
    path: '/projects/none',
    template: 'projectsNone'
  } );

  this.route( 'projects.list', {
    path: '/projects/list'
  } );

  this.route( 'projects.show', {
    path: '/projects/:_id'
  } );

  this.route( 'messages.list', {
    path: '/messages/list'
  } );

  this.route( 'messages.show', {
    path: '/messages/:_id'
  } );
} );