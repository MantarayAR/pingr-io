Template._projectsInterested.helpers( {
  skillsJoined : function () {
    var project = Projects.findOne( {
      _id : Router.current().params._id
    } );

    if ( project )
      return project.lookingFor.join( ', ' );
    else
      return '';
  },
  project : function () {
    return Projects.findOne( {
      _id : Router.current().params._id
    } );
  }
} );

Template._projectsInterested.events( {
  'click [type=submit]' : function ( e ) {
    e.preventDefault();

    IonLoading.show();

    var project = Projects.findOne( {
      _id : Router.current().params._id
    } );

    var message = $( '[name=message]' ).val();

    Meteor.call( 'interestedMessage', project._id, message, function ( error, result ) {
      IonLoading.hide();

      if ( error ) {
        doAction( 'handleError', error );
      } else {
        IonModal.close();

        Meteor.setTimeout( function () {
          IonLoading.show({
            customTemplate: '<h3>Message Sent!</h3><p>We sent your message to the project creator.</p>',
            duration: 3000
          });
        }, 600 );
      }
    } );
  }
} );