Template._messagesNew.helpers( {
  message : function () {
    return UserMessages.findOne( {
      _id : Router.current().params._id
    } );
  },
  messageQuote : function () {
    var message = UserMessages.findOne( {
      _id : Router.current().params._id
    } );

    message = _.map( message.message.split( '\n' ), function ( a ) {
      return '> ' + a;
    } );

    return message.join('\n');
  }
} );

Template._messagesNew.events( {
  'click [type=submit]' : function ( e ) {
    e.preventDefault();

    IonLoading.show();

    var message = $( '[name=message]' ).val();
    var parentMessageId = Router.current().params._id;

    Meteor.call( 'messagesNew', parentMessageId, message, function ( error, result ) {
      IonLoading.hide();

      if ( error ) {
        doAction( 'handleError', error );
      } else {
        IonModal.close();

        Meteor.setTimeout( function () {
          IonLoading.show({
            customTemplate: '<h3>Message Sent!</h3><p>We\'ve sent your message.</p>',
            duration: 3000
          });

          Router.go( 'messages.list' );
        }, 600 );
      }
    } );
  }
} );