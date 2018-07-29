const DEV_WEBPACK_SERVER = 'http://localhost:8050';

import Layout from '../Layout'

export default new class LayoutFactory {
    /** @var {Array} */
    manifest = null;

    /** @var boolean */
    isProd = false;

    devUrl = DEV_WEBPACK_SERVER;
    prodUrl = '';

    setProd(mode) {
        this.isProd = mode;
        return this;
    }

    setManifest(manifest) {
        this.manifest = manifest;
        return this;
    }

    setProdUrl(url) {
        this.prodUrl = url;
        return this;
    }

    setDevUrl(url) {
        this.devUrl = url;
        return this;
    }

    getCssFile() {
        return this.isProd ?
            `${this.prodUrl}/assets/${this.manifest['main.css']}` :
            `${this.devUrl}/public/assets/styles.css`;
    }

    getJsFile() {
        return this.isProd ?
            `${this.prodUrl}/assets/${this.manifest['main.js']}` :
            `${this.devUrl}/public/assets/bundle.js`;
    }

    /**
     * @return {Layout}
     */
    getLayout() {
        return new Layout(this.getJsFile(), this.getCssFile())
    }
}