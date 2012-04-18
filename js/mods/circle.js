define( [ 'jquery', 'mods/iterator' ], function( $, Iterator ) {
    var options = {
        target: '#page',
        fillTarget: true,
        clearTarget: false,
        color: 'rgba(255, 255, 0, 0.5)',
        canvasWidth: '1000',
        canvaseHeight: '700',
        degrees: 1,
        radius: 30,
        x: 60, //rand( radius, 210 - radius ),
        y: 60 //rand( radius, 210 - radius );
    };

    var rand = function ( from, to ){
        return Math.floor( Math.random() * ( to - from + 1 ) + from );
    };

    var $canvas = null;
    var ctx = null;

    var Circle = function( cfg ){
        if ( ! ( this instanceof Circle ) ){
            return new Circle( cfg );
        }

        this.options = $.extend( {}, options, cfg );

        if ( this.options.clearTarget ){
            $( this.options.target ).empty();
        }

        if ( this.options.fillTarget ){
            var $target = $( this.options.target );

            this.options.canvasWidth = $target.outerWidth();
            this.options.canvaseHeight = $target.outerHeight();
        }

        $canvas = $canvas || $( '<canvas id="circle" width="' + this.options.canvasWidth + '" height="' + this.options.canvaseHeight + '"></canvas>' )
            .appendTo( this.options.target );

        ctx = ctx || $canvas[ 0 ].getContext( '2d' );

        this.$canvas = $canvas;
        this.ctx = ctx;
    };

    Circle.options = options;

    Circle.onComplete = $.noop;

    Circle.prototype = {
        render: function(){
            var radians = ( Math.PI / 180 ) * this.options.degrees;

            ctx.beginPath();
            ctx.arc( this.options.x, this.options.y, 20, 0, radians, false );
            //ctx.closePath();
            //ctx.fill();
            ctx.lineWidth = 5;
            ctx.stroke();

            this.options.degrees = this.options.degrees + 20;

            if ( this.options.degrees > 380 ) {
                options.degrees = 1;
                options.x = rand( this.options.radius, this.$canvas.outerWidth() - this.options.radius );
                options.y = rand( this.options.radius, this.$canvas.outerHeight() - this.options.radius );

                Circle.onComplete();
                return false;
            }
        }
    };

    // public api /////////////////////////////////////////////////////////////
    return Circle;
});
