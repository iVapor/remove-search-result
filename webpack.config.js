const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const isDev = process.env.NODE_ENV === 'development'

function getEntry(name) {
    return [path.join(__dirname, './static', name), ...(isDev ? [`mv3-hot-reload/${name}`] : [])]
}

const config = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        // app: path.join(__dirname, "./static/index.js"),
        // // hotReload: path.join(__dirname, "./static/hotReload.js"),
        // // background: path.join(__dirname, './static'),
        // contentScript: path.join(__dirname, "./static/contentScript.js"),

        app: getEntry('index.js'),
        // hotReload: path.join(__dirname, "./static/hotReload.js"),
        contentScript: getEntry('contentScript.js'),
    },

    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ["*", ".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Block Search Result", // change this to your app title
            meta: {
                charset: "utf-8",
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                "theme-color": "#000000"
            },
            manifest: "manifest.json",
            filename: "index.html",
            template: "./static/index.html",
            hash: true
        }),

        new CopyPlugin([
            {
                from: "chrome/icons",
                to: "icons"
            }
        ]),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};
module.exports = config;