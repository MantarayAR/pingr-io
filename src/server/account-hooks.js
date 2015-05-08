Accounts.onCreateUser( function ( options, user ) {
  console.log( user );

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