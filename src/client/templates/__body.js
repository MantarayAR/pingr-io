Template.body.events( {
  'click [data-action=back]' : function ( e ) {
    e.preventDefault();
    
    ( new userHistory() ).goBack();
  }
} );