addAction( 'findAProject', function () {
  IonLoading.show();

  Meteor.call( 'findAProject', function ( error, result ) {
    // TODO handle the case where we don't have any projects to show

    IonLoading.hide();
    if ( error ) {
      alert( error );
    } else {
      IonModal.close();
      IonLoading.hide();

      Router.go( 'projects.show', {
        _id: result
      } );
    }
  });
} );