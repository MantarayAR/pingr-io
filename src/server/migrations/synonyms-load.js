Migrations.add( 'add-synonyms-to-database-test', function () {
  'use strict';

  var synonyms = JSON.parse( Assets.getText( 'synonyms.json' ) );
 
  for ( var i = 0; i < synonyms.length; i++ ) {
    Synonyms.insert( synonyms[i] )  
  }
} );

Migrations.add( 'add-synonyms-to-database-2-beta', function () {
  'use strict';

  var synonyms = JSON.parse( Assets.getText( 'synonyms2.json' ) );
 
  for ( var i = 0; i < synonyms.length; i++ ) {
    Synonyms.insert( synonyms[i] )  
  }
} );
