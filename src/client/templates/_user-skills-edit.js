Template._userSkillsEdit.onCreated( function () {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'userSkills', Meteor.userId() );
  }.bind( this ) );
} );

Template._userSkillsEdit.onRendered( function () {
  this.autorun( function () {
    if ( ! this.subscriptions.ready() ) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind ( this ) );
} );

Template._userSkillsEdit.helpers( {
  userSkills : function () {
    return UserSkills.findOne( {
      owner : Meteor.userId()
    } );
  }
} );

AutoForm.hooks( {
  'userskills-edit-form' : {
    onSuccess: function ( operation, result, template ) {
      IonLoading.show();

      Meteor.call( 'findAProject', function ( error, result ) {
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
    },
    onError : function ( operation, error, template ) {
      alert( error );
    }
  }
} );