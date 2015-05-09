Template._userSkillsEdit.onCreated( function () {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'userSkills', Meteor.userId() );
  }.bind( this ) );
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
      doAction( 'findAProject' );
    },
    onError : function ( operation, error, template ) {
      doAction( 'handleError', error );
    }
  }
} );