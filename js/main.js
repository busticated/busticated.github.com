require.config({
    paths : {
        'jquery' : 'libs/jquery'
    }
});
require( [ 'jquery', 'mods/wordguesser', 'mods/looper', 'mods/circle' ], function( $, WordGuesser, looper, circle ){
    'use strict';

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

    looper.start( function(){ return title.render(); }, 1000 / 60 );


    var circleCount = 0;

    $( '#page' ).on( 'click.circle', function(){
        var c = circle();
        looper.start( function(){ return c.drawSegment(); });

        circle.onComplete = function(){
            var newC = circle();
            looper.start( function(){ return newC.drawSegment(); });

            circleCount += 1;
            if ( circleCount === 2000 ){
                $( '#js-wordguess' ).css( 'color', 'rgba(255,255,255,0.7)' );
                $( '#page' ).off( 'click.circle' );
                circle.onComplete = $.noop;
            }
        };
    });
});
