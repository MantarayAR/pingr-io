AutoForm.hooks( {
  'projects-new-form' : {
    onSuccess: function ( operation, result, template ) {
      IonModal.close();

      Router.go( 'projects.show', { _id : result } );
    },
    onError: function ( operation, error, template ) {
      alert( error );
    }
  }
} );