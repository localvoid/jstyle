# jstyle

jstyle is a simple program that compiles javascript to css files.

## Usage Example

```js
var base = new StyleSheet({
  rules: function(c) {
    return [
      select('body', [
        prop('margin', '0')
      ])
    ];
  }
});

addEntry('main.css', new StyleSheet({
  require: base,
  rules: function(c) {
    return [
      select(['.Main'], [
        prop('top', '20px')
      ])
    ];
  }
}));
```

```sh
$ jstyle -f css.js
```

## API

##### StyleSheet(opts)
##### select(selectors, children)
##### media(conditions, children)
##### keyframes(id, children)
##### prop(name, value)
##### addEntry(name, stylesheet)
##### addPreprocessor(preprocessor)

## CLI Options

##### --file

Type: `String`  
Alias: `-f`

Input javascript file.

##### --output

Type: `String`  
Alias: `-o`  
Default: Current working directory

Output directory.

##### --minify-class-names

Type: `Boolean`  
Default: `false`

Minify class names and generate json map with minified names.

##### --closure-map

Type: `Boolean`  
Default: `false`

Generate javascript file with minified class names for google-closure
library.

##### --closure-map-prefix

Type: `String`  
Default: `css.map`

Package name prefix for closure map file.

##### --json

Type: `Boolean`  
Default: `false`

Write to stdout as json result instead of writing to files.

