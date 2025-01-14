var path                          = require('path'),
    ExtractTextPlugin             = require('extract-text-webpack-plugin'),
    config                        = require('./package').config,
    webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

config.resolve = {
    root: path.resolve(config.root),
    alias: {
        config: path.resolve('./config' + (process.env.NODE_ENV == 'production' ? '' : '-dev') + '.js')
    },
    extensions: config.extensions
};

config.node = {
    fs: 'empty'
};

config.module = {
    loaders: [
        {
            test: /(\.jsx$)|(\.js$)/,
            exclude: /node_modules\/(?!(chirashi|bricks\.js)).+/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0']
            }
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.(otf|eot|svg|ttf|woff)/,
            loader: 'url?limit=10000'
        },
        {
            test: /\.(jpg|png|gif)/,
            loader: 'url?limit=10000'
        },
        {
            test: /\.scss$/,
            loader: (process.env.NODE_ENV == 'production' ? ExtractTextPlugin.extract('style', 'css!postcss!sass') : 'style!css!postcss!sass')
        },
        {
            test: /\.(glsl|frag|vert|html|svg)$/,
            loader: 'raw'
        },
        {
          test: /\.(glsl|frag|vert)$/,
          loader: 'glslify'
        }
        // {
        //     test: /\.(glsl|frag|vert)$/,
        //     loader: 'shader'
        // }
    ]
};

config.postcss = [
    require('autoprefixer')(config.autoprefixer)
];

config.plugins = [
    new ExtractTextPlugin(config.cssFile)
];

// config.target = webpackTargetElectronRenderer(config);

module.exports = config;
