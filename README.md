# organize-cli
[![Build Status](https://travis-ci.org/ManrajGrover/organize-cli.svg?branch=master)](https://travis-ci.org/ManrajGrover/organize-cli) [![npm](https://img.shields.io/npm/v/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) [![npm](https://img.shields.io/npm/dt/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

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

## Related

* [classifier](https://github.com/bhrigu123/classifier)

## License
[MIT](https://github.com/ManrajGrover/organize-cli/blob/master/License.md) © Manraj Singh
