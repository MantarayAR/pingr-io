Template.projectsShow.onCreated( function () {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'project', Router.current().params._id );
  }.bind( this ) );
} );

Template.projectsShow.onRendered( function () {
  this.autorun( function () {
    if ( ! this.subscriptions.ready() ) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind ( this ) );
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
    return Meteor.userId() === project.owner;
  }
} );