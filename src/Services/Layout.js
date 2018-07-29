import {toJSON} from 'transit-immutable-js';

export default class Layout {

    store   = null;
    title   = '';
    jsFile  = '';
    cssFile = '';

    constructor(jsFile, cssFile) {
        this.jsFile = jsFile
        this.cssFile = cssFile
    }

    setManifest(manifest) {
        this.manifest = manifest;
    }

    setStore(store) {
        this.store = store;
    }

    setProdMode() {
        this.isProd = true;
    }

    setTitle(title) {
        this.title = title;
    }

    render(componentHtml) {
        const state = JSON.stringify(toJSON(this.store.getState()));
        return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.title}</title>
                <link rel="stylesheet" href="${this.cssFile}">
            </head>
            <body>
                <script type="application/javascript">
                    window.__INITIAL_STATE__ = ${state};
                </script>
                <div id="react-view">${componentHtml}</div>
                <script type="application/javascript" src="${this.jsFile}"></script>
            </body>
        </html>`
    }
}
