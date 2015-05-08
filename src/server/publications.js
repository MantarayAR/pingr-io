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

Meteor.publish('userSkills', function(ownerId) {
  return UserSkills.find({owner: ownerId});
});