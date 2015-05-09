/**
 * Hack for getting the Ionic Tabs to update with window.history.back()
 */
Template.body.onRendered(function () {
  this.autorun( function () {
    var data = Router.current();
    Session.set('ionTab.current', Router.current().route.getName() );
  }.bind( this ) );
});

Template.body.onRendered( function () {
  this.autorun( function () {
    this.subscription = Meteor.subscribe( 'messagesList' );
  }.bind( this ) );
} );

Template.body.events( {
  'click [data-action=back]' : function ( e ) {
    e.preventDefault();
    
    ( new userHistory() ).goBack();
  }
} );

Template.registerHelper( 'unreadMessages', function () {
  // Count the messages that are not read and
  // where they are not the "from" user
  var messages = UserMessages.find( {
    from : {
      $ne : Meteor.userId()

    },
    read : {
      $ne : true
    }
  });

  return messages.fetch().length;
} );