require.config({
    paths : {
        'jquery' : 'libs/jquery'
    }
});
require( [ 'jquery', 'mods/wordguesser', 'mods/looper' ], function( $, WordGuesser, looper ){
    var title = new WordGuesser({
            text: 'busticated',
            availChars: 'abcdeistux1237890!$&?',
            mode: 'reverse'
        });

    title.configs.onComplete = function(){
            title.setMode( 'full' );
            looper.add( function(){ return title.render(); } );

            title.configs.onComplete = function(){
                setTimeout( function(){
                    title.setMode( 'simple' );
                    looper.add( function(){ return title.render(); });
                }, 1500 );
            };
        };

    looper.start( function(){
        return title.render();
    }, 30 );
});
