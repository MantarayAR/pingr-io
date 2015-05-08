Router.configure( {
  layoutTemplate: 'layout'
} );

Router.map( function() {
  this.route( 'home', {
    path: '/'
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
} );