window['micro_app_html'] = {
    bootstrap: () => {
        console.log('purehtml bootstrap');
        return Promise.resolve();
    },
    mount: props => {
        console.log('purehtml mount', props);
    },
    unmount: props => {
        console.log('purehtml unmount', props);
        return Promise.resolve();
    },
};
