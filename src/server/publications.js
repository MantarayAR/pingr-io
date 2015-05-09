Meteor.publish('project', function() {
  return Projects.find();
});

Meteor.publish('projectsList', function() {
  return Projects.find({
    owner : this.userId
  });
});

Meteor.publish('projects', function(_id) {
  return Projects.find({_id: _id});
});

Meteor.publish('messages', function(_id) {
  return UserMessages.find({_id: _id});
});

Meteor.publish('messagesList', function( /* TODO lazy load in chunks */ ) {
  return UserMessages.find( {
    $or : 
      [
        {
          to : this.userId
        },
        {
          from : this.userId
        }
      ]
  } );
});

Meteor.publish('userSkills', function(ownerId) {
  return UserSkills.find({owner: ownerId});
});