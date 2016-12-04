# organizeit
[![npm](https://img.shields.io/npm/v/organizeit.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organizeit) [![npm](https://img.shields.io/npm/dt/organizeit.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organizeit) ![awesome](https://img.shields.io/badge/awesome-yes-green.svg)

Organize files in your current directory, by classifying them into folders of music, pdfs, images, etc in seconds

## Installation

```
$ npm install -g organizeit
```

## How to use?

1. Change directory to the folder you want to organize files in.
2. Run the package using `organize files` command.
3. That's it! Spend your time doing something useful now.

## Example

###Before:
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

###After:
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
MIT © [Manraj Singh](https://github.com/ManrajGrover/organizeit/blob/master/License.md)
