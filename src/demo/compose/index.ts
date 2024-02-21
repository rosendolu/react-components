/**
 * 同步 compose
 *
 */

// 从右向左 compose
export function composeRight(...funcs: Function[]) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(
        (a, b) =>
            async (...args: any) =>
                await a(await b(...args))
    );
}
// 从左向右compose
function composeLeft(...fns) {
    if (fns.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce(
        (a, b) =>
            (...args: any) =>
                b(a(...args))
    );
}

/**
 * 异步compose
 *
 */

function asyncCompose(...fns) {
    if (fns.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce(
        (a, b) =>
            async (...args: any) =>
                await b(await a(...args))
    );
}

// koa 中 洋葱模型 compose
function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }
    return function (context, next) {
        // last called middleware #
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
