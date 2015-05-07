AccountsTemplates.configure({
    // Hooks
    onLogoutHook: function () {
      Router.go( 'home' );
    },
    onSubmitHook: function () {
      Router.go( 'home' );
    }
});