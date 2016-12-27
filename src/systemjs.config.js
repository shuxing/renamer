(function (global) {
  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                          { main: 'bootstrap.js', defaultExtension: 'js' },
  };

  var packageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'forms',
    'router'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function (pkgName) {
    packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' };
  });

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },

    // Maps all rxjs to the bundled version... included in head.
    paths: {
      // "rxjs/*": "rxjs/bundles/Rx.min.js"
    },
    bundles: {
            "../www/bundles/Rx.min.js": [
                "rxjs/*",
                "rxjs/operator/*",
                "rxjs/observable/*",
                "rxjs/add/operator/*",
                "rxjs/add/observable/*",
                "rxjs/util/*"
            ]
        },

    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
