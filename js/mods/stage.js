define( [ 'jquery' ], function( $ ) {
    'use strict';

    var defaults = {
            container: '#page',
            clearContainer: false,
            makeFullScreen: true,
            canvasWidth: '1000',
            canvaseHeight: '700'
        },
        $canvas,
        ctx;

    var stage = function( cfg ){
        var settings = $.extend( {}, defaults, cfg );

        if ( settings.makeFullScreen ){
            var $container = $( settings.container );
            settings.canvasWidth = $container.outerWidth();
            settings.canvaseHeight = $container.outerHeight();
        }

        var d = {};
        d.settings = settings;
        d.create = function(){
            $canvas = $( '<canvas id="thecanvas" width="' + this.settings.canvasWidth + '" height="' + this.settings.canvaseHeight + '"></canvas>' );
            $canvas.appendTo( this.settings.container );
            return $canvas;
        };
        d.clear = function(){
            this.$canvas[ 0 ].width = this.$canvas[ 0 ].width;
            return this;
        };
        d.$canvas = $canvas || d.create();
        d.ctx = ctx || d.$canvas[ 0 ].getContext( '2d' );

        return d;
    };

    // public api /////////////////////////////////////////////////////////////
    return stage;
});
