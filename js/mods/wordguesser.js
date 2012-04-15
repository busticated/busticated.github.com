define( [ 'jquery' ], function( $ ) {
    var options = {
            target: '#js-wordguess',
            letterClass: '.main-title-letter',
            mode: 'full', //full or simple
            onComplete: $.noop,
            availChars: 'abcdefhiklmnorstuvwxz1234567890.,!$&?'
        };

    var Guesser = function ( cfg ){
        if ( ! ( this instanceof Guesser ) ){
            return new Guesser( cfg );
        }

        this.configs = $.extend( {}, options, cfg );
        this.$target = $( this.configs.target );
        this.tmpl = '<span class="' + this.configs.letterClass.replace( '.', '' ) + '">{{char}}</span>';
        this.text = this.$target.text();
        this.letters = this.text.split( '' );
        this.word = [];
        this.idx = 0;
        this.incr = 1;

        this.$target.text( '' );
        this.setMode( this.configs.mode );
    };

    Guesser.prototype = {
        guess: function (){
            var cfg = this.configs,
                num = Math.floor( Math.random() * cfg.availChars.length );
            return cfg.availChars.substring( num, ( num + 1 ) );
        },
        setMode: function( mode ){
            if ( mode.toLowerCase() !== 'full' ){
                this.idx = this.letters.length - 1;
                this.incr = 0;
                this.word = this.letters;
            }
        },
        isMatch: function( char, idx ){
            return char === this.text.substring( idx, ( idx + 1 ) );
        },
        isLastChar: function( idx ){
            return idx === ( this.text.length - 1 );
        },
        render: function(){
            var char = this.guess(),
                currIdx = this.idx;

            this.word[ currIdx ] = this.tmpl.replace( '{{char}}', char );

            if ( this.isMatch( char, currIdx ) ){
                this.word[ currIdx ] = char;
                this.idx += this.incr;
            }

            this.$target.html( this.word.join( '' ) );

            if ( this.isMatch( char, currIdx ) && this.isLastChar( currIdx ) ){
                typeof this.configs.onComplete === 'function' && this.configs.onComplete();
                return false;
            }
            return true;
        }
    };

    // public api /////////////////////////////////////////////////////////////
    return Guesser;
});
