define( [ 'jquery', 'mods/stage' ], function( $, stage ) {
    'use strict';

    var defaults = {
        color: 'rgba(255, 255, 0, 0.5)',
        lineWidth: 40,
        strokeStyle: 'rgba(0, 0, 0, 0.1)',
        segments: 15,
        radius: 50,
        x: 60, //rand( radius, 210 - radius ),
        y: 60 //rand( radius, 210 - radius );
    };

    var rand = function ( from, to ){
        return Math.floor( Math.random() * ( to - from + 1 ) + from );
    };

    var $canvas = stage().$canvas;
    var ctx = stage().ctx;

    var circle = function( cfg ){
        var c = {};
        c.settings = $.extend( {}, defaults, cfg );
        c.x = c.settings.x;
        c.y = c.settings.y;
        c.currentSegment = 0;
        c.toRadians = function( deg ){
            return ( Math.PI / 180 ) * deg;
        };
        c.getTick = function(num){
            var tick = this.toRadians( 360 ) / this.settings.segments;
            return tick * num;
        };
        c.setStyles = function( lineWidth, strokeStyle ){
            ctx.lineWidth = lineWidth || this.settings.lineWidth;
            ctx.strokeStyle = strokeStyle || this.settings.strokeStyle;
            return this;
        };
        c.segment = function( start, end ){
            start = start || this.getTick( this.currentSegment );
            end = end || this.getTick( this.currentSegment + 1 );
            ctx.beginPath();
            ctx.arc( this.x, this.y, this.settings.radius, start, end );
            ctx.stroke();
            ctx.closePath();
            return this;
        };
        c.draw = function(){
            this.setStyles();
            while ( this.currentSegment < this.settings.segments ){
                this.segment( this.getTick( this.currentSegment ), this.getTick( this.currentSegment + 1 ) );
                this.currentSegment += 1;
            }
            this.currentSegment = 0;
            circle.onComplete();
            return this;
        };
        c.drawSegment = function(){
            this.setStyles();
            this.segment( this.getTick( this.currentSegment ), this.getTick( this.currentSegment + 1 ) );
            this.currentSegment += 1;

            if ( this.currentSegment === this.settings.segments ) {
                circle.reset( this.settings.radius, $canvas.width(), $canvas.height() );
                circle.onComplete();
                return false;
            }
        };

        return c;
    };

    circle.defaults = defaults;
    circle.reset = function( radius, width, height ){
        defaults.x = rand( radius, width - radius );
        defaults.y = rand( radius, height - radius );
    };
    circle.onComplete = $.noop;

    // public api /////////////////////////////////////////////////////////////
    return circle;
});
