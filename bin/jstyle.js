#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var jstyle = require('jstyle');
var minifyClassNamesPass = require('jstyle/minify_class_names');
var convertToStringPass = require('jstyle/convert_to_string');

var args = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  boolean: ['minify-class-names', 'closure-map', 'json'],
  string: ['define', 'output', 'file', 'closure-map-prefix'],
  alias: {
    'd': 'define',
    'o': 'output',
    'f': 'file'
  }
});

function _usage() {
  process.stdout.write('Usage: jstyle -f [file.js]\n\n');
  process.stdout.write('\t-f --file\t\t\tInput file [string]\n');
  process.stdout.write('\t-o --output\t\t\tOutput directory [string]\n');
  process.stdout.write('\t   --json\t\t\tJSON output\n');
  process.stdout.write('\t   --minify-class-names\t\tMinify class names\n');
  process.stdout.write('\t   --closure-map\t\tGenerate google-closure class names map\n');
  process.stdout.write('\t   --closure-map-prefix\t\tClosure map package prefix [string]\n');
}

if (args.file === void 0) {
  _usage();
  process.exit(1);
}

var inputFile = args['file'];
var fileName = path.basename(inputFile, '.js');
var outputPath = args['output'] || './';
var jsonOutput = args['json'] || false;
var minifyClassNames = args['minify-class-names'] || false;
var closureMap = args['closure-map'] || false;
var closureMapPrefix = args['closure-map-prefix'] || 'css.map';

var entries = [];
var steps = [];

GLOBAL.StyleSheet = jstyle.StyleSheet;
GLOBAL.select = jstyle.select;
GLOBAL.media = jstyle.media;
GLOBAL.prop = jstyle.prop;
GLOBAL.addEntry = function(name, stylesheet) {
  entries.push({name: name, stylesheet: stylesheet});
};
GLOBAL.addPreprocessor = function(pp) {
  steps.push(pp);
};

require(path.resolve(process.cwd(), inputFile));

if (minifyClassNames) {
  steps.push(minifyClassNamesPass);
}
steps.push(convertToStringPass);

var ctx = new jstyle.Context();

var result = {
  entries: entries.map(function(e) {
    var ss = jstyle.build(e.stylesheet);
    return {
      name: e.name,
      css: steps.reduce(function(p, c) {
        return c(p, ctx);
      }, ss)};
  }),
  map: ctx.map
};

if (jsonOutput) {
  process.stdout.write(JSON.stringify(result, null, 2));
} else {
  for (var i = 0; i < result.entries.length; i++) {
    var e = result.entries[i];
    fs.writeFileSync(path.join(outputPath, e.name), e.css);
  }
  if (minifyClassNames) {
    var mapString = JSON.stringify(result.map, null, 2);
    fs.writeFileSync(path.join(outputPath, fileName + '_map.json'), mapString);
    if (args['closure-map']) {
      fs.writeFileSync(path.join(outputPath, fileName + '_map.js'),
          'goog.provide(\'' + closureMapPrefix + '.' + fileName + '\');\n\n' +
          'goog.setCssNameMapping(' + mapString + ', \'BY_WHOLE\');\n');
    }
  }
}

process.exit(0);
