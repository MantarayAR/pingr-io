Meteor.startup(function () {
  addAction( 'findAProject', function () {
    IonLoading.show();

    Meteor.call( 'findAProject', function ( error, result ) {
      Meteor.setTimeout( function () {
        IonLoading.hide()
      }, 500 );

      if ( error ) {
        doAction( 'handleError', error );
      } else {
        if ( IonModal.views.length > 0 ) {
          IonModal.close();  
        }

        if ( result === -1 ) {
          Router.go( 'projects.none' );
        } else {
          Router.go( 'projects.show', {
            _id: result
          } );  
        }
      }
    } );
  } );

  addAction( 'handleError', function ( error ) {
    IonPopup.alert( {
      title: 'Error',
      template: error.message,
      okText: 'Ok'
    } );
  } );
} );