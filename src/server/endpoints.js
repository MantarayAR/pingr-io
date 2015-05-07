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

    var projects = projects.fetch();

    if ( projects ) {
      // pick a random one
      return Random.choice( projects.fetch() )._id;
    } else {
      throw new Error( 'No projects that are looking for your skills!' );
    }
  }
} );