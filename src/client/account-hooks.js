AccountsTemplates.configure({
    // Hooks
    onLogoutHook: function () {
      Router.go( 'home' );
      IonModal.close();
    },
    onSubmitHook: function () {


      Router.go( 'home' );
      IonModal.close();
    }
});

Accounts.onLogin( function () {
  Meteor.call( 'onLogin' );
} );