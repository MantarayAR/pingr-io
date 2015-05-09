Template.profile.onCreated( function() {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'userSettings' );
  }.bind( this ) );
})

Template.profile.helpers( {
  settings : function () {
    return UserSettings.findOne({});
  }
} );

Template.profile.events( {
  'click [name=disableNotifications]' : function ( e ) {

    var u = UserSettings.findOne({});
    var checked = $('[name=disableNotifications]').is(':checked');

    UserSettings.update( u._id, {
      $set : {
        disableNotifications : checked
      }
    } );
  }
} );