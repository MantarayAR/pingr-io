UserMessages = new Mongo.Collection( 'user-messages' );

UserMessages.attachSchema( new SimpleSchema( {
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  from : {
    type : String
  },
  fromName : {
    type : String
  },
  to : {
    type : String
  },
  toName : {
    type : String
  },
  message : {
    type : String
  },
  messageShort : {
    type : String
  },
  read : {
    type : Boolean,
    optional : true
  },
  parent : {
    type : String,
    optional : true
  }
} ) );

UserMessages.allow({
  insert: function () {
    return true
  },
  update: function () {
    // TODO move this server side. Only allow the owner to edit
    return true
  }
});