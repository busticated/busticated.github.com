require.config({
    paths : {
        'jquery' : 'libs/jquery'
    }
});
require( [ 'jquery', 'mods/wordguesser', 'mods/looper', 'mods/circle' ], function( $, WordGuesser, looper, Circle ){
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


    var circleCount = 0;

    $( '#page' ).on( 'click', function(){
        var circle = new Circle();

        looper.start( function(){
            return circle.render();
        });

        Circle.onComplete = function(){
            circle = new Circle();
            looper.start( function(){
                return circle.render();
            });

            circleCount += 1;

            if ( circleCount === 2000 ){
                $( '#js-wordguess' ).css( 'color', 'rgba(255,255,255,0.7)' );
            }
        };
    });
});
