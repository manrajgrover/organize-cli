# organizeit
[![npm](https://img.shields.io/npm/v/organizeit.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organizeit) [![npm](https://img.shields.io/npm/dt/organizeit.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/organizeit)

Organize files in your current directory, by classifying them into folders of music, pdfs, images, etc in seconds

## Installation

```
$ npm install -g organizeit
```

## How to use?

1. Change directory to the folder you want to organize files in.
2. Run the package using `organize it` command.
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
│   ├── Organize_Music
│   │   └── Daft Punk - Get Lucky.mp3
│   │   ├── Seven Lions - Worlds Apart.mp3
|	|
│   ├── Organize_Documents
│   │   └── Project.docx
│   │   └── Report.pdf
│   │   ├── Resume.pdf
|	|
│   ├── Organize_Compressed
│   │   └── Some Random Library.zip
│   │   └── archive.7z
|	|
│   ├── Organize_System Files
│   │   └── Install me.exe
|	|
│   ├── Organize_Images
│   │   └── Profile Picture.png
│   │   └── Cats.jpg
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

## Credits
Thanks to [@bhrigu123](https://github.com/bhrigu123/classifier) for first developing it for Python users.

## Disclaimer
This is not a perfect software. Things may go wrong and files may not be recoverable. Author has not faced any issue since using but cannot guarantee perfect behavior and hence not liable for any mishap.

## License

```
The MIT License (MIT)

Copyright (c) 2016 Manraj Singh

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
```
