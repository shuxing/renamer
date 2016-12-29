(function (global) {
  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                          { main: 'bootstrap.js', defaultExtension: 'js' },
  };

  var map = {
    'app':                        'app',
    'rxjs':                       'npm:rxjs',
  }

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
    map['@angular/'+pkgName] = 'npm:@angular/' + pkgName;
  });

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },

    // Maps all rxjs to the bundled version... included in head.
    paths: {
      'npm:': '../node_modules/'
      // "rxjs/*": "rxjs/bundles/Rx.min.js"
    },
    map: map,
    bundles: {
            "../dist/bundles/Rx.min.js": [
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
