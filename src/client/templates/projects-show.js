Template.projectsShow.onCreated( function () {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'project', Router.current().params._id );
  }.bind( this ) );
} );

Template.projectsShow.helpers( {
  project: function () {
    return Projects.findOne( {
      _id : Router.current().params._id
    } );
  },
  isOwner : function () {
    var project = Projects.findOne( {
      _id : Router.current().params._id
    } );
    if ( project ) {
      return Meteor.userId() === project.owner;
    } else {
      return false;
    }
  }
} );

Template.projectsShow.events( {
  'click [data-action=interested]' : function ( e ) {
    // TODO
    console.log( 'interested' );
  },
  'click [data-action=back]' : function ( e ) {
    window.history.back()
  },
  'click [data-action=next]' : function ( e ) {
    doAction( 'findAProject' );
  }
} );
