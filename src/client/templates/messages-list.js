Template.messagesList.onCreated( function () {
  this.autorun( function () {
    this.subscription = Meteor.subscribe( 'messagesList' );
  }.bind( this ) );
} );

Template.messagesList.helpers( {
  messages : function () {
    return UserMessages.find({}, {
      sort : {
        createdAt : -1
      }
    });
  },
  messageClasses : function () {
    var additionalClasses = '';

    if ( this.read || this.from === Meteor.userId() ) {
      additionalClasses = 'message__read ';
    } else {
      additionalClasses = 'message__unread ';
    }

    return 'item-icon-right item-icon-left ' + additionalClasses
  },
  incoming : function () {
    if ( this.to === Meteor.userId() ) {
      return true;
    } else {
      return false;
    }
  }
} );