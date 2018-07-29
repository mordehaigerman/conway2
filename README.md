# conway2
Conway 2 - Game of Life: Infection. (Node JS, Command-Line)

## Install
To install dependences, please run the following command:

```bash
$ npm install
```

## Tests
To run the tests, please run the following command:

```bash
$ npm test
```

## Play
To play the game, please run the following command:

```bash
$ # Usage: play|p [options] <width> <height> <infect-after> <max-generations> <seed>
$ node index.js play 5 5 5 5 "0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0"
```
## Options

Name         | Possible Values | Default Value
-------------|-----------------|--------------
-h, --help   |                 |
-o, --output | flat, 2d        | flat

## License
The content of this library is released under the **MIT License** by **Mordehai German**.
You can find a copy of this license in [LICENSE](https://github.com/mordehaigerman/conway2/blob/master/LICENSE) or at http://www.opensource.org/licenses/mit.
