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

    if ( skills == null || skills.length == 0 ) {
      throw new Meteor.Error( 'no-skills', 'You need to enter some skills.' );
    }

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
  },
  projectsDelete : function ( projectId ) {
    check( Meteor.userId(), String );
    check( projectId, String );

    var project = Projects.findOne( {
      _id : projectId,
      owner : Meteor.userId()
    } );

    if ( project ) {
      Projects.remove( {
        _id : projectId,
        owner : Meteor.userId()
      } );

      return true;
    }
    else {
      throw new Meteor.Error( 'invalid-user', 'You do not own this project.' );
    }
  },
  interestedMessage : function ( projectId, message ) {
    check( Meteor.userId(), String );
    check( projectId, String );
    check( message, String );

    var project = Projects.findOne( {
      _id : projectId
    } );

    var toUser = Meteor.users.findOne( { _id : project.owner } )

    var toName       = toUser.emails[0].address.split('@')[0];
    var fromName     = Meteor.user().emails[0].address.split('@')[0];
    
    // TODO move messageShort to the schema
    var messageShort = message.substring( 0, 50 ) + '...';

    UserMessages.insert( {
      from : Meteor.user()._id,
      fromName : fromName,
      to : project.owner,
      toName : toName,
      message : message,
      messageShort : messageShort
    } );

    return true;
  },
  messagesNew : function ( parentMessageId, message ) {
    // Get the parent message
    var parentMessage = UserMessages.findOne( {
      _id : parentMessageId
    } );

    // TODO move messageShort to the schema
    var messageShort = message.substring( 0, 50 ) + '...';

    var newMessage = {
      to : parentMessage.from,
      toName : parentMessage.fromName,
      from : parentMessage.to,
      fromName : parentMessage.toName,
      message : message,
      messageShort : messageShort,
      parent : parentMessageId
    };

    UserMessages.insert( newMessage );

    return true;
  },
  messagesRead : function ( messageId ) {
    check( Meteor.userId(), String );
    check( messageId, String );

    UserMessages.update( {
      _id : messageId,
      to : Meteor.userId()
    }, {
      $set : {
        read : true
      }
    }, {
      validate : false
    } );

    return true;
  },
  messagesParents : function ( messageId ) {
    check( messageId, String );
    check( Meteor.userId(), String );

    var messagesParents = [];

    var message = UserMessages.findOne( {
      _id : messageId
    } );

    while ( message.parent ) {
      message = UserMessages.findOne( {
        _id : message.parent
      } );

      if ( message ) {
        messagesParents.push( message );
      }
    }

    return messagesParents;
  }
} );