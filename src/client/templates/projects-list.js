Template.projectsList.onCreated( function () {
  this.autorun( function () {
    this.subscription = Meteor.subscribe( 'projectsList' );
  }.bind( this ) );
} );

Template.projectsList.onRendered( function () {
  this.autorun( function () {
    console.log( this, this.subscription );
    if ( ! this.subscription.ready() ) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind( this ) );
} );

Template.projectsList.helpers( {
  projects: function () {
    return Projects.find();
  }
} );