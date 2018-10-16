"use strict";

!(function () {

    /**
     * aop
     * @param target 绑定的对象
     * @param key 绑定的对象的方法
     * @param callback 回调事件
     * @param options 参数
     * @returns {boolean}
     */
    function aop(target, key, callback, options) {
        if (!target) {
            return false;
        }

        var _func = null;
        try {
            _func = target[key];
        }
        catch (e) {
            return false;
        }

        if (!_func) {
            return false;
        }

        if (_func && _func._aop) {
            return false;
        }

        try {
            target[key] = callback(_func, options);
        } catch (e) {
            return false;
        }

        target[key]._aop = [_func];
        return true;
    }

    /**
     * un aop
     * @param target
     * @param key
     */
    function unAop(target, key) {
        try {
            var _func = target[key]._aop;
            //
            if (_func) {
                target[key] = _func[0];
                target[key]._aop = null;
                delete target[key]._aop;
            }
        } catch (e) {
        }
    }

    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function () {
            return aop;
        });
        // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = aop;
    } else {
        // browser
        window.aop = aop;
    }

})();