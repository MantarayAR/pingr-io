Projects = new Mongo.Collection( 'projects' );

Projects.attachSchema( new SimpleSchema( {
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
  title : {
    type : String,
    label : 'Title',
    autoform : {
      'label-type' : 'floating',
      placeholder : 'A Catchy Title'
    }
  },
  description : {
    type : String,
    label : 'Description',
    autoform : {
      'label-type' : 'floating',
      placeholder : 'Description: "Like X for Y"'
    }
  },
  lookingFor : {
    type : [String],
    label : 'Skills You Are Looking For',
    maxCount: 5,
    autoform : {
      placeholder: 'A skill you are looking for',
      settings : {
        position: 'top',
        limit: 5,
        rules: [
          {
            token: '',
            collection: function () { return Skills },
            field: 'name',
            template: function () { return Template._pill }
          }
        ]
      }
    }
  }
} ) );

Projects.allow({
  insert: function () {
    return true
  },
  update: function () {
    // TODO move this server side. Only allow the owner to edit
    return true
  }
});