# organize-cli
[![Build Status](https://travis-ci.org/ManrajGrover/organize-cli.svg?branch=master)](https://travis-ci.org/ManrajGrover/organize-cli) [![Build status](https://ci.appveyor.com/api/projects/status/ynou4s6geylqsmo1?svg=true)](https://ci.appveyor.com/project/ManrajGrover/organize-cli)
 [![npm](https://img.shields.io/npm/v/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) [![npm](https://img.shields.io/npm/dt/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

> Organize files based on file types, formally known as `organizeit`

<img src="https://github.com/ManrajGrover/organize-cli/blob/master/assets/demo.gif" height="500"/>

## Installation

```
$ npm install -g organize-cli
```

## Usage

```
Usage: organize [options]

Options:
  -o, --output  Output directory - Creates one if doesn't exist         [string]
  -d, --date    Organize files by dates                                [boolean]
  -s, --source  Source directory to organize                 [string] [required]
  -t, --type    Specific types to organize - strings of file extensions  [array]
  -f, --folder  Specific folder to move specific files to               [string]
  -h, --help    Show help                                              [boolean]

Examples:
  organize -s ~/Downloads -o . -t mp3 wav -f "Songs"
```

## Development

Run:

```sh
$ git clone https://github.com/ManrajGrover/organize-cli.git
$ cd organize-cli
$ npm link
```

This will setup a symbolic link to the CLI. Any changes in source files will now be reflected when running the `organize` command.

To lint your code, run

```sh
$ npm run lint
```

## Like it?

:star2: this repo to show support. You can also tweet about this project by clicking [here](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2FManrajGrover%2Forganize-cli&via=manrajsgrover&text=Checkout%20this%20command%20line%20tool%20for%20organizing%20your%20files%20in%20a%20better%20way%20on%20%23Github&hashtags=cli%2C%20node).

## Related

* [classifier](https://github.com/bhrigu123/classifier)

## License
[MIT](https://github.com/ManrajGrover/organize-cli/blob/master/License.md) © Manraj Singh
