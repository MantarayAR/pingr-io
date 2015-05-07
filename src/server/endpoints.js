Meteor.methods( {
  onLogin : function () {
    check( Meteor.userId(), String );

    UserSkills.upsert( {
      skills : []
    }, {
      owner : Meteor.userId()
    } );
  },
  findAProject : function () {
    check( Meteor.userId(), String );

    var skills = UserSkills.findOne( {
      owner : Meteor.userId()
    } );

    // TODO find projects that have the
    // skills listed, but are NOT
    // owned by this user

    var projects = Projects.find( {
      lookingFor : {
        $in : skills.skills
      }
    } );

    if ( projects &&
         projects.fetch &&
         projects.count() > 0 ) {
      var projects = projects.fetch();

      // pick a random one
      return Random.choice( projects )._id;
    } else {
      return -1;
    }
  }
} );