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
  'click [data-action=next]' : function ( e ) {
    e.preventDefault();

    doAction( 'findAProject' );
  },
  'click [data-action=projectDelete]' : function ( e ) {
    e.preventDefault();

    var that = this;

    IonPopup.confirm({
      title: 'Are you sure?',
      template: 'Are you sure you want to delete this project?  You cannot undo this action.',
      onOk: function() {

        IonLoading.show();

        Meteor.call( 'projectsDelete', Router.current().params._id, function ( error, result ) {
          Meteor.setTimeout( function () {
            IonLoading.hide();

            if ( error ) {
            doAction( 'handleError', error );
            } else {
              Router.go( 'projects.list' );
            }
          }, 500 );
        } );
      }
    });
  }
} );
