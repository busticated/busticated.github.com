// TODO enable a reverse mode where a full word is deconstructed (opposite of full mode)
define( [ 'jquery' ], function( $ ) {
    var options = {
            target: '#js-wordguess',
            letterClass: '.main-title-letter',
            mode: 'full', //full or simple
            onComplete: $.noop,
            availChars: 'abcdefhiklmnorstuvwxz1234567890.,!$&?',
            text: false
    };

    var Guesser = function ( cfg ){
        if ( ! ( this instanceof Guesser ) ){
            return new Guesser( cfg );
        }

        this.configs = $.extend( {}, options, cfg );
        this.$target = $( this.configs.target );
        this.tmpl = '<span class="' + this.configs.letterClass.replace( '.', '' ) + '">{{char}}</span>';
        this.text = this.configs.text || this.$target.text();
        this.letters = this.text.split( '' );

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

            switch( mode.toLowerCase() ) {
                case 'reverse':
                    this.idx = this.letters.length - 1;
                    this.incr = -1;
                    this.word = this.text.split( '' );
                    this.configs.mode = 'reverse';
                    break;

                case 'full':
                    this.idx = 0;
                    this.incr = 1;
                    this.word = [];
                    this.configs.mode = 'full';
                    break;

                default:
                    this.letters = this.text.split( '' );
                    this.idx = this.letters.length - 1;
                    this.incr = 0;
                    this.word = this.text.split( '' );
            }

            return this;
        },
        isMatch: function( char, idx ){
            return char === this.text.substring( idx, ( idx + 1 ) );
        },
        isLastChar: function( idx ){
            return idx === ( this.text.length - 1 );
        },
        isFirstChar: function(){
            return this.idx === -1;
        },
        isComplete: function( char, currIdx ){
            return (  this.configs.mode === 'full' && this.isMatch( char, currIdx ) && this.isLastChar( currIdx ) ) || 
                ( this.configs.mode === 'reverse' && this.isMatch( char, currIdx ) && this.isFirstChar() );
        },
        render: function(){
            var char = this.guess(),
                currIdx = this.idx;

            this.word[ currIdx ] = this.tmpl.replace( '{{char}}', char );

            if ( this.isMatch( char, currIdx ) ){
                this.word[ currIdx ] = this.configs.mode === 'reverse' ? '' : char;
                this.idx += this.incr;
                this.configs.mode === 'reverse' && this.letters.pop();
            }

            this.$target.html( this.word.join( '' ) );

            if ( this.isComplete( char, currIdx ) ) {
                typeof this.configs.onComplete === 'function' && this.configs.onComplete();
                return false;
            }
            return true;
        }
    };

    // public api /////////////////////////////////////////////////////////////
    return Guesser;
});
