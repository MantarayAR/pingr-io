Template._projectsEdit.helpers( {
  project : function () {

    return Projects.findOne( {
      _id : Router.current().params._id
    } );
  }
} );

AutoForm.hooks( {
  'projects-edit-form' : {
    onSuccess: function ( operation, result, template ) {
      IonModal.close();
    },
    onError : function ( operation, error, template ) {
      doAction( 'handleError', error );
    }
  }
} );