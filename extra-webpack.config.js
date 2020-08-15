var webpack = require('webpack');

module.exports = {
    plugins: [{
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
    }]
};