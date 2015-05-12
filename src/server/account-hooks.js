Accounts.onCreateUser( function ( options, user ) {
  UserSkills.upsert( {
      owner : user._id
  }, {
    $set : {
      skills : [],
      owner : user._id
    } 
  }, {
    getAutoValues : false
  });

  return user;
})