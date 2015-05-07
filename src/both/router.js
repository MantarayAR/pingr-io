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

  this.route( 'projects.show', {
    path: '/projects/:_id'
  } );
} );