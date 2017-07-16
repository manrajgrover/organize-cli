# organize-cli
[![Build Status](https://travis-ci.org/ManrajGrover/organize-cli.svg?branch=master)](https://travis-ci.org/ManrajGrover/organize-cli) [![npm](https://img.shields.io/npm/v/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) [![npm](https://img.shields.io/npm/dt/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

> Organize files based on file types, formally known as `organizeit`

## Installation

```
$ npm install -g organize-cli
```

## Usage

```
Usage: organize [options]

Options:
  -o, --output  Output directory - Creates one if doesn't exist         [string]
  -s, --source  Source directory to organize                 [string] [required]
  -t, --type    Specific types to organize - strings of file extensions  [array]
  -f, --folder  Specific folder to move specific files to               [string]
  -h, --help    Show help                                              [boolean]

Examples:
  organize -s ~/Downloads -o . -t mp3 wav -f "Songs"
```

## Example

### Before:

```
Downloads
│   ├── Project.docx
│   ├── Resume.pdf
│   ├── Seven Lions - Worlds Apart.mp3
│   ├── Daft Punk - Get Lucky.mp3
│   ├── Report.pdf
│   ├── Profile Picture.png
│   ├── Some Random Library.zip
│   ├── Cats.jpg
│   ├── Install me.exe
```

### After `organize -s ~/Downloads`:

```
Downloads
│   ├── Music
│   │   └── Daft Punk - Get Lucky.mp3
│   │   ├── Seven Lions - Worlds Apart.mp3
|	|
│   ├── Documents
│   │   └── Project.docx
│   │   └── Report.pdf
│   │   ├── Resume.pdf
|	|
│   ├── Compressed
│   │   └── Some Random Library.zip
│   │   └── archive.7z
|	|
│   ├── System Files
│   │   └── Install me.exe
|	|
│   ├── Images
│   │   └── Profile Picture.png
│   │   └── Cats.jpg
```

## Related

* [classifier](https://github.com/bhrigu123/classifier)

## Disclaimer
This is not a perfect software. Things may go wrong and files may not be recoverable. Author has not faced any issue since using but cannot guarantee perfect behavior and hence not liable for any mishap.

## License
[MIT](https://github.com/ManrajGrover/organize-cli/blob/master/License.md) © Manraj Singh
