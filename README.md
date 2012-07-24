# strcmp.js

Some string comparison functions which have been written to help me grok the algorithms.  If you are after this kind of thing and more natural language goodness, I'd recommend checking out [natural](https://github.com/NaturalNode/natural) (although I think the  [Jaro-Winkler distance](http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance) implementation is broken at the moment).

<a href="http://travis-ci.org/#!/DamonOehlman/strcmp.js"><img src="https://secure.travis-ci.org/DamonOehlman/strcmp.js.png" alt="Build Status"></a>

__NOTE:__ I'm not a maths / algorithms geek, and the implementation here could probably be sped up / made more correct by someone if they wanted to.  If you are that kind of person though, your time is probably better spent refining the implementation in the natural library.

## Example Usage

At the moment, check out the tests for example usage, but it kind of looks like this:

```js
strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro', precision: 3 });
// 0.944

strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro-winkler', precision: 3 });
// 0.961
```

OR

```js
strcmp.jaro('MARTHA', 'MARHTA');
// 0.9444444444444445

strcmp.jaroWinkler('MARTHA', 'MARHTA');
// 0.9611111111111111
```

If you are using node, then just `npm install strcmp` and require as you would any other module.