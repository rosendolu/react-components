import classNames from 'classnames';
import { classModule, eventListenersModule, h, init, propsModule, styleModule } from 'snabbdom';
import { useEffectOnce } from 'usehooks-ts';

export default function Index() {
    useEffectOnce(() => {
        const patch = init([
            // Init patch function with chosen modules
            classModule, // makes it easy to toggle classes
            propsModule, // for setting properties on DOM elements
            styleModule, // handles styling on elements with support for animations
            eventListenersModule, // attaches event listeners
        ]);
        // debugger;
        const container = document.getElementById('container')!;
        const exitNode = h('div#container.two.classes');
        const vnode = h('div#container.two.classes', { on: { click: () => console.log('div clicked') } }, [
            h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
            ' and this is just normal text',
            h('a', { props: { href: '/foo' } }, "I'll take you places!"),
        ]);
        // Patch into empty DOM element – this modifies the DOM as a side effect
        patch(container, vnode);

        const newVnode = h('div#container.two.classes', { on: { click: () => console.log('updated div clicked') } }, [
            h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
            ' and this is still just normal text',
            h('a', { props: { href: '/bar' } }, "I'll take you places!"),
        ]);
        // Second `patch` invocation
        patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
    });

    return (
        <div
            id="container"
            data-type="elment"
            style={{ color: 'red' }}
            className={classNames('min-h-[300px] outline-dashed outline-1 outline-red-500')}>
            container
        </div>
    );
}
