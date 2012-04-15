require.config({
    paths : {
        'jquery' : 'libs/jquery'
    }
});
require( [ 'jquery', 'mods/wordguesser', 'mods/looper' ], function( $, WordGuesser, looper ){
    var title = new WordGuesser();

    title.configs.onComplete = function(){
        title.setMode( 'simple' );
        setTimeout( function(){
            looper.add( function(){ return title.render(); } );
        }, 1500 );
    };

    looper.start( function(){ return title.render(); }, 30 );
});
