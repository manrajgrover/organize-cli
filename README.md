# organize-cli
[![npm](https://img.shields.io/npm/v/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) [![npm](https://img.shields.io/npm/dt/organize-cli.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organize-cli) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

> Organize files in your current directory, by classifying them into folders of music, pdfs, images, etc in seconds, formally known as `organizeit`

## Installation

```
$ npm install -g organize-cli
```

## Usage

### Commands available

```
organize <command>

Commands:
  files  Organizes current directory

Options:
  -h, --help  Show help                                                [boolean]
```

#### Command `files`

```
$ organize files --help
Usage: organize files [options]

Options:
  -h, --help    Show help                                              [boolean]
  -o, --output  Output directory - Creates one if doesn't exist         [string]
  -s, --source  Source directory to organize                            [string]

Examples:
  organize files -s ~/Downloads -o .
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

### After:

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
[MIT](https://github.com/ManrajGrover/organize-cli/blob/master/LICENSE.md) © Manraj Singh
