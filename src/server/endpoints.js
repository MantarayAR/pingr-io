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

    skills = skills.skills;

    // merge skills with synomym skills
    // Do this 2 timees
    for ( var times = 0; times < 2; times++ ) {
      var relatedSkills = Synonyms.find( {
        word : {
          $in : skills
        }
      } );

      if ( relatedSkills &&
           relatedSkills.fetch &&
           relatedSkills.count() > 0 ) {
        relatedSkills = relatedSkills.fetch(); 

        for ( var i = 0; i < relatedSkills.length; i++ ) {
          skills = _.union( skills, relatedSkills[i].synonyms );
        }
      }
    }

    // find projects that have the
    // skills listed, but are NOT
    // owned by this user
    console.log( skills );
    var projects = Projects.find( {
      lookingFor : {
        $in : skills
      },
      owner : {
        $not : {
          $eq : Meteor.userId()
        }
      }
    } );

    if ( projects &&
         projects.fetch &&
         projects.count() > 0 ) {
      var projects = projects.fetch();

      // pick a random one
      console.log( projects );
      var option = Random.choice( projects )._id;

      // TODO tag this option as "viewed" by this user


      return option;
    } else {
      return -1;
    }
  }
} );