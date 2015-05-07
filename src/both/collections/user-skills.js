UserSkills = new Mongo.Collection( 'user-skills' );

UserSkills.attachSchema( new SimpleSchema( {
  owner : {
    type: String,
    autoValue: function () {
      'use strict';

      if ( this.isInsert ) {
        return Meteor.userId()
      } else if (this.isUpsert) {
        return { $setOnInsert: Meteor.userId() };
      } else {
        this.unset();
      }
    }
  },
  skills : {
    type : [String],
    label : 'Skills',
    optional : true,
    autoform : {
      'label-type' : 'floating',
      placeholder : 'A skill you wish to contribute'
    }
  }
} ) );

UserSkills.allow({
  insert: function () {
    return true
  },
  update: function () {
    // TODO move this server side. Only allow the owner to edit
    return true
  }
});