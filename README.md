# aop 一个对象的方法

## demo

例如 aop window.setTimeout

```JavaScript

aop(window,'setTimeout',function(it){

    return function(){
        var args = [].prototype.slice(arguments);

        // do somethings
        if (it.apply) {
            it.apply(this, args);
        } else {
            Function.prototype.apply.apply(it, [it, args]);
        }

        // do somethings
    }

})
```