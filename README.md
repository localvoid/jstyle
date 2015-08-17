# jstyle

jstyle is a simple program that compiles javascript to css files.

## Example

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
$ jstyle --minify css.js
```
