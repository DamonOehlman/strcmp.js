# strcmp.js

Some string comparison functions which have been written to help me grok
the algorithms.  If you are after this kind of thing and more natural
language goodness, I'd recommend checking out
[natural](https://github.com/NaturalNode/natural).

**NOTE:** I'm not a maths / algorithms geek, and the implementation here 
could probably be sped up / made more correct by someone if they wanted to.
If you are that kind of person though, your time is probably better spent
refining the implementation in the natural library.

[![NPM](https://nodei.co/npm/strcmp.png)](https://nodei.co/npm/strcmp/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable) [![Build Status](https://api.travis-ci.org/DamonOehlman/strcmp.js.svg?branch=master)](https://travis-ci.org/DamonOehlman/strcmp.js)

## Example Usage

At the moment, check out the tests for example usage, but it kind of
looks like this:

```js
strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro', precision: 3 });
// --> 0.944

strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro-winkler', precision: 3 });
// --> 0.961
```

OR

```js
strcmp.jaro('MARTHA', 'MARHTA');
// --> 0.9444444444444445

strcmp.jaroWinkler('MARTHA', 'MARHTA');
// --> 0.9611111111111111
```

## LICENSE

The MIT License (MIT)

Copyright (c) 2018 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


