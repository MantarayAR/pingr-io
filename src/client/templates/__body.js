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
    Meteor.subscribe( 'messagesList' );
    Meteor.subscribe( 'userSettings' );
  }.bind( this ) );

  Template.body.favico = new Favico( {
    animation : 'popFade'
  } );

  Template.body.notifications = 0;
  Template.body.firstRun = true;
} );

Template.body.events( {
  'click [data-action=back]' : function ( e ) {
    e.preventDefault();
    
    ( new userHistory() ).goBack();
  },
  'click [data-action=logout]' : function ( e ) {
    e.preventDefault();

    Meteor.logout( function () {
      Router.go( 'home' );
    } );
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

  var number = messages.fetch().length;

  Meteor.autorun( function () {
    if ( Template.body.favico ) {
      if ( number > 0 ) {
        Template.body.favico.badge( number );
      } else {
        Template.body.favico.reset();
      }

      // Determine whether to notify or not
      var userSettings = UserSettings.findOne({});

      if ( ! userSettings.disableNotifications &&
           ! Template.body.firstRun && 
           Template.body.notifications < number ) {
        // Notify
        Notification.requestPermission( function () {
          var notification = new Notification( 'Message received', {
            body: 'You have a total of ' + number + ' unread messages.',
            tag : 'preset', // TODO
            icon: 'http://placehold.it/20x20' //TODO
          } );

          notification.onclick = function( x ) {
            window.focus();
          };
        } );
      }

      Template.body.firstRun = false;
      Template.body.notifications = number;
    }
  }.bind( this ) );

  return number;
} );