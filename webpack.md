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