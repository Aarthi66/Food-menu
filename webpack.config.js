const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageSpritePlugin = require("image-sprite-webpack-plugin");
module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    devServer: {             //it actually serve the file to the current directory unless specify contentBase
        contentBase: "./dist"
    },
    module: {               //babel
        rules: [
            {
                test: /\.js$/,          // regular expression
                exclude: /node_modules/,   // if we neglect this, then the loader include all extensions in node_modules
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                use : [
                    'file-loader'
                ]
            
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    }
                ]
            }

            //     {
            //     test :  /\.css$/,
            //     use: [
            //             'style-loader',
            //                    'css-loader'
            //                 ]
            // },
            // {
            //     test : /\.(jpg|png|svg)$/,
            //     use :[
            //             'file-loader',
            //     ]
            // }
        ]
    },

    plugins: [             // includes the bundles into the script
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        // new ImageSpritePlugin({
        //     commentOrigin: true,
        //     compress: false,
        //     extensions: ['gif', 'png','jpg','svg'],
        //     indent: '  ',
        //     log: true,
        //     outputPath: './dist',
        //     outputFilename: 'css/sprite.png',
        //     padding: 10,
        //     suffix: ''
        // })

    ],

};