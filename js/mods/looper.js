/*global define: false, require: false */

define( function(){
    'use strict';

    var _funcs = [], //cache of functions to run each iteration
        _loopDuration = 1000 / 60,
        _isRunning = false,
        _timerId = null,
        _lastRun = 0;

    //report looper state
    var isRunning = function(){ return _isRunning; };

    //start loop, add funcion to _funcs cache (opt) & set _loopDuration (opt)
    var start = function( func, spd ){
            if ( typeof func === 'function' ) {
                add( func );
            }

            if ( isRunning() ) {
                return func;
            }

            _isRunning = true;
            _loopDuration = spd || _loopDuration;
            _loop();

            return func;
        };

    //stops loop immediately
    var stop = function(){ _isRunning = false; clearTimeout( _timerId ); };

    //gets & sets _loopDuration, restarts loop after setting _loopDuration
    var rate = function( spd ){
            if ( typeof spd === 'undefined' ){
                return _loopDuration;
            }

            _loopDuration = spd;
            stop();
            start();
        };

    var add = function( func ) { _funcs.push( func ); return func; };

    // todo - reliable way to compare functions?
    var remove = function( func ){
            for ( var i = -1, l = _funcs.length; ++i < l; ) {
                if ( func === _funcs[ i ] ){
                    _funcs.splice( i, 1 );
                }
            }
        };

    var clear = function() { _funcs = []; };

    var _loop = function(){
            var now = new Date().getTime(),
                timeToRun;

            if ( ! isRunning() ){
                return;
            }

            for ( var i = 0, l = _funcs.length; i < l; i = i + 1 ) {
                if ( typeof _funcs[ i ] === 'function' && _funcs[ i ]( new Date() ) === false ){
                    _funcs.splice( i, 1 );
                }
            }

            timeToRun = Math.max(0, _loopDuration - ( now - _lastRun ) ); // compensate for time taken to execute _funcs

            _timerId = setTimeout( _loop, timeToRun );
            _lastRun = now + timeToRun;
        };

    // public api /////////////////////////////////////////////////////////////
    return {
        isRunning : isRunning,
        start : start,
        stop : stop,
        clear: clear,
        add : add,
        remove : remove,
        rate : rate
    };
});
