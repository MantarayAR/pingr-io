Template.messagesShow.onCreated( function () {
  this.autorun( function () {
    this.subscriptions = Meteor.subscribe( 'messages', Router.current().params._id );
  }.bind( this ) );

  Session.set( 'parentMessages', null );
  Session.set( 'parentMessagesNotLoaded', true );
} );

Template.messagesShow.onRendered( function () {
  Meteor.call( 'messagesRead', Router.current().params._id );
} );

Template.messagesShow.helpers( {
  message: function () {
    return UserMessages.findOne( {
      _id : Router.current().params._id
    } );
  },
  messageHtml : function () {
    var message = this.message;

    // Make the message safe
    message = $('<div/>').text(message).html();
    message = message.replace( /(?:\r\n|\r|\n)/g, '<br/>' );

    return message;
  },
  isRecipient : function () {
    var message = UserMessages.findOne( {
      _id : Router.current().params._id
    } );
    if ( message ) {
      return Meteor.userId() === message.to;
    } else {
      return false;
    }
  },
  hasParentMessage : function () {
    var message = UserMessages.findOne( {
      _id : Router.current().params._id
    } );
    if ( message &&
         message.parent ) {
      return true
    } else {
      return false;
    }
  },
  parentMessagesNotLoaded : function () {
    return Session.get( 'parentMessagesNotLoaded' );
  },
  parentMessages : function() {
    return Session.get( 'parentMessages' );
  }
} );

Template.messagesShow.events( {

  'click [data-action=messageParent]' : function ( e ) {
    e.preventDefault();

    // ask for parent messages
    var messageId = Router.current().params._id;

    Meteor.call( 'messagesParents', messageId, function( error, result ) {
      if ( error ) {
        doAction( 'handleError', error );
      } else {
        Session.set( 'parentMessages', result );
        Session.set( 'parentMessagesNotLoaded', false );  
      }
    } )
  }
} );

