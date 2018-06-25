- Installer node sur la machine
- Vérifier que node et npm sont installés dans le terminal grâce à node -v et npm -v 
- npm init dans le dossier afin d'initialiser le projet
- renseigner le JSON (package.json)
- installer webpack en tant que dépendance avec npm i -D webpack
- Si c'est la première fois que l'on installe webpack il faut l'installer global avec npm -g i webpack. Il y a de fortes chances pour que cela gueule. Il faut alors aller dans les comptes users et s'assurer que le compte actuel ait les droits admin.

* Facultatif ou pour installer une version spécifique d'une dépendance *
- npm view webpack versions (on voit pas tout)
- npm view webpack versions --json
- npm -i -D webpack@2.2.0 (overwriting)

- Les settings de vs code permettent de masquer certains fichiers/dossier grâce à exclude

- webpack ./src/app.js ./dist/app.bundle.js pour minifier un .js 
- webpack ./src/app.js ./dist/app.bundle.js -p --watch pour activer la surveillance des fichiers
- webpack.config.js permet de faire un fichier de configuration pour webpack qui contiendra les options pour le build. Par conséquent, les lignes de commande ci-dessus sont automatiser dans un appel de script comme npm run dev / npm run prod

---------------------------------------------------------------------------------------------------

- npm i html-webpack-plugin --save-dev pour installer ce plugin en dépendance
- var HtmlWebpackPlugin = require('html-webpack-plugin'); en haut de webpack.config.js
- plugins: [new HtmlWebpackPlugin()] dans le même fichier pour inclure les plugins
- A partir d'ici, on casse le string d'output car le plugin d'HTML ne sera pas le seul plugin ni language.
- path: path.resolve(__dirname, 'dist'), car path: 'dist' provoquait un bug
- npm run dev créé donc également un fichier index.html
- ctrl-c pour stopper le processus
- Dans webpack.config.js, ajout de quelques paramètres de config .js pour la génération de index.html 
(https://github.com/jantimon/html-webpack-plugin)

---------------------------------------------------------------------------------------------------

INSTALLATION DES LOADERS CSS/SASS
- npm i css-loader --save-dev (on créé alors app.css manuellement dans src)
- Dans webpack.config.js
module: {
    rules: [
        {test: /\.css$/, use: 'css-loader'}
    ]
},
- const css = require('./app.css');    dans src/app.js
- A ce stade, le css est inclus dans le .js et n'est donc pas interpreté par le browser. Il va falloir installer un autre loader.
- npm i style-loader --save-dev
- Dans webpack.config.js, on modifie la rule en
module: {
    rules: [
        {test: /\.css$/, use: ['style-loader','css-loader']}
    ]
},
- Sauf que le css est injecté dans une balise style dans le head. Pas terrible
- Bref, pour le moment on va installer le loader sass avec npm i sass-loader node-sass --save-dev et l'ajouter a webpack.config.js
- Dans webpack.config.js, on stipule scss à la place de css dans la rule
- On renomme src/app.css en src/app.scss
- Dans src/app.js on renomme le require en const css = require('./app.scss');

- Afin de générer le .css dans un fichier à part, on va installer extract-text-webpack-plugin
- npm i extract-text-webpack-plugin --save-dev
- PROBLEME ICI JAI DU INSTALLER UNE AUTRE VERSION DU PLUGIN DEPUIS LA PAGE:
# for webpack 2 
npm install --save-dev extract-text-webpack-plugin@2.1.2
- const ExtractTextPlugin = require("extract-text-webpack-plugin"); en haut de webpack.config.js
- Dans webpack.config.js, la bonne syntaxe pour cette version de webpack est:
module: {
    rules: [
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: '/dist'
            })
        }
    ]
},
- Et après le tableau des plugins:
new ExtractTextPlugin({
    filename: 'app.css',
    disable: false,
    allChunks: true
})

---------------------------------------------------------------------------------------------------

# INSTALLATION DE WEBPACK DEV SERVER

- npm i webpack-dev-server -D 
- Mettre webpack et webpack-dev-server en 2.2.0 comme sur le tuto de Petr. Pas réussi avec des version différentes
- 'npm i webpack@2.2.0 -D' et 'npm i webpack-dev-server@2.2.0 -D'
- Dans package.json, on remplace "dev": "webpack -d --watch" par "webpack-dev-server"