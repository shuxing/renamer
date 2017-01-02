(function (global) {
  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'bootstrap.js', defaultExtension: 'js' },
    'lodash':                     { main: 'lodash.js', defaultExtension: 'js' },
    'angular2-tree-component':    { main: 'dist/angular2-tree-component.js', defaultExtension: 'js' }
  };

  var map = {
    'app':                        'app',
    'angular2-tree-component':    'npm:angular2-tree-component',
    'ng2-auto-complete':          'npm:ng2-auto-complete/dist/ng2-auto-complete.umd.js',
    'lodash':                     'npm:lodash',
    'path' :                      '@node/path',
    'fs-promise' :                '@node/fs-promise'
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
    map['@angular/' + pkgName] = 'npm:@angular/' + pkgName;
  });

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },

    // Maps all rxjs to the bundled version... included in head.
    paths: {
      'npm:': '../node_modules/'
    },
    map: map,
    bundles: {
      "bundles/Rx.min.js": [
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
