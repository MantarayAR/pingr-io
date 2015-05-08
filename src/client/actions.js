Meteor.startup(function () {
  addAction( 'findAProject', function () {
    IonLoading.show();

    Meteor.call( 'findAProject', function ( error, result ) {
      Meteor.setTimeout( function () {
        IonLoading.hide()
      }, 100 );

      if ( error ) {
        alert( error );
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
} );