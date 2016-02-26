# handsonangular
Projet de travail pour découverte d'angular

## bootstrap

Vérifier si node > 4 est installé :
````
node -v
````

Vérifier si git est installé :
````
git --version
````

Vérifier que npm (le système de gestion de modules externes de node) fonctionne :
```
npm -v
```

Installer gulp (le système de build/task runner) en global via npm pour rendre la ligne de commande disponible (nécessite éventuellement de rouvrir la console après) :
```
npm install -g gulp
```
Les warning ne sont pas importants, tant qu'il n'y a pas d'erreur à la fin, tout va bien.

Vérifiez que gulp s'est bien installé :
```
gulp -v
```

Aller dans votre répertoire de travail et récupérez les sources des exercices sur github :
```
git clone https://github.com/DuchessFrance/hands-on-angular
```
Les sources sont alors récupérées dans le dossier qui vient d'être créé : `hands-on-angular`

Allez dans le dossier `hands-on-angular`
Pour installer les modules nécessaires au bon fonctionnement du projet, il faut de nouveau utiliser le package manager de node :
```
npm install
```
S'il y a des warnings, ce n'est pas grave. Au milieu de l'installation, node-gyp essaie d'utiliser python et semble faire une erreur, mais il passe ensuite en version node, donc ça n'a pas d'impact. Si vous avez obtenu une erreur, supprimez le dossier `node_modules` dans lequel les modules ont été téléchargés puis réinstallez en relançant la commande NPM.

Installez le serveur selenium nécessaire au framework de test :
```
gulp webdriverUpdate
```

Si éventuellement par la suite vous obtenez une erreur ressemblant à "Missing dependency 'XXX'", supprimez votre dossier `node_modules`, réinstallez avec npm et installez de nouveau votre serveur selenium.


## usage

Il vous faudra 3 consoles

La première console sera pour faire tourner le serveur selenium pour pouvoir lancer les tests e2e. Dans cette console, lancez la commande :
````
gulp webdriverStandalone
````
Cette commande continuera à tourner en tâche de fond.

La deuxième console sera pour faire tourner le build system du projet qui se chargera d'un certain nombre de tâches sur les fichiers sources pour générer un dossier dist prêt à être utilisé. Il se chargera seul et automatiquement de mettre vos fichiers à jour chaque fois que vous les modifiez, aussi vous n'aurez pas à relancer la tâche en question (livereload). De plus, ce build system hébergera un serveur node (HAPI) qui s'occupera de servir vos fichiers statiques (toute l'application Angular en fait) sur l'URL http://localhost:9000. De plus, quelques routes d'API nécessaires pour les exercices seront aussi exposées par le serveur. Enfin, cette tâche vous fait des retours sur la qualité et le code style de votre code, aussi prenez bien en compte ses warnings.
````
gulp start
````
Cette commande continuera à tourner en tâche de fond.
Il est possible que suite à des erreurs de syntaxe JS cette tâche s'arrête silencieusement. A ce moment, aucune modification que vous ferez sur vos fichiers en sera plus prise en compte. Il faudra donc relancer le serveur pour avoir de nouveau des modifications prises en compte.
Notez que sans ce build, il vous faudra veiller dans vos applications à ajouter tous les fichiers JS liés à votre application angular, ainsi qu'à entourer vos fonctions d'injection d'un tableau précisant le nom des dépendances utilisées (voir ng-annotate, ainsi que la minification d'Angular).

La troisième console sera pour lancer les tests e2e utilisant Mocha (framework de test), Chai (framework d'assertion) et Protractor (framework de test end-to-end d'Angular utilisant webdriver de Selenium)
````
gulp test
````
Cette commande vous rendra la main et il faudra la lancer à chaque fois que vous voulez lancer les tests.
Si vous la lancez maintenant, elle passera et marquera que 0 tests ont été passés et que de nombreux tests sont en pending (donc ne sont pas lancés). C'est normal, tout va bien. Tous les tests ont été "skippés" pour l'instant.
Si vous avez des erreurs suite à cette commande, il est possible que :
- votre selenium n'arrive pas à ouvrir Chrome. Dans ce cas, ouvrez le fichier `tests/protractor.config.js` et changez le navigateur utilisé pour les tests
- votre selenium n'arrive pas à trouver java. Dans ce cas, installez java
- vous obtenez une erreur de module non trouvé. Dans ce cas, suivez la procédure liée aux problèmes de module (juste avant la catégorie usage)
- il n'y a pas d'instance selenium en cours. Vérifiez que la première console avec le serveur selenium est bien en train de tourner
- vous obtenez une autre erreur. Dans ce cas, vous ne pourrez pas utiliser les tests e2e et faire ce projet en TDD. Suivez malgré tout les instructions dans les fichiers de test et testez à la main votre résultat sur http://localhost:9000

Maintenant que l'environnement est monté, commençons à faire du javascript.
Nous allons principalement utiliser deux dossiers : `tests` et `client`. Vous pouvez néanmoins faire un petit détour par les dossiers `dist` qui contient les fichiers statiques servis par le serveur, `server` qui contient le serveur node HAPI ainsi que trois routes d'API, le dossier `node_modules` et le fichier `package.json` qui contiennent les modules utilisés par ce projet, le fichier `Gulpfile.js` qui définit les différentes tâches rendues disponibles par gulp (toutes les commandes commençant par `gulp`) ou encore le dossier `solution` qui contient les différentes solutions étape par étape. Commencez donc par ouvrir le fichier `tests/main.js` et suivez ses instructions.
