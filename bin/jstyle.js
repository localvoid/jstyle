#!/usr/bin/env node

var path = require('path');
var jstyle = require('jstyle');

var args = require('minimist')(process.argv.slice(2), {
  stopEarly: true,
  boolean: ['minify'],
  string: ['environment', 'define'],
  alias: {
    'm': 'minify',
    'e': 'environment',
    'd': 'define'
  }
});

function _usage() {
  process.stdout.write('Usage: jstyle [file.js]\n\n');
  process.stdout.write('\t -m --minify\tMinify class names\n')
}

if (args._.length === 0) {
  _usage();
  process.exit(1);
}

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

require(path.resolve(process.cwd(), args._[0]));

var ctx = new jstyle.Context();

if (args.minify) {
  steps.push(jstyle.minifyClassNames);
}
steps.push(jstyle.convertToString);

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

process.stdout.write(JSON.stringify(result, null, 2));
process.exit(0);
