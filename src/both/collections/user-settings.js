UserSettings = new Mongo.Collection( 'user-settings' );

UserSettings.allow({
  insert: function () {
    return true
  },
  update: function () {
    // TODO move this server side. Only allow the owner to edit
    return true
  }
});