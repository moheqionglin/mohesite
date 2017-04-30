var marked = require('marked');
var fs = require('fs');

const val = 'Name | Action | Tooltip<br>Class\n' +
    ':--- | :----- | :--------------\n' +
    '    bold | toggleBold | Bold<br>fa fa-bold\n' +
    'italic | toggleItalic | Italic<br>fa fa-italic\n' +
    'strikethrough | toggleStrikethrough | Strikethrough<br>fa fa-strikethrough\n' +
    'heading | toggleHeadingSmaller | Heading<br>fa fa-header\n' +
    'heading-smaller | toggleHeadingSmaller | Smaller Heading<br>fa fa-header\n' +
    'heading-bigger | toggleHeadingBigger | Bigger Heading<br>fa fa-lg fa-header\n' +
    'heading-1 | toggleHeading1 | Big Heading<br>fa fa-header fa-header-x fa-header-1\n' +
    'heading-2 | toggleHeading2 | Medium Heading<br>fa fa-header fa-header-x fa-header-2\n' +
    'heading-3 | toggleHeading3 | Small Heading<br>fa fa-header fa-header-x fa-header-3\n' +
    'code | toggleCodeBlock | Code<br>fa fa-code\n' +
    'quote | toggleBlockquote | Quote<br>fa fa-quote-left\n' +
    'unordered-list | toggleUnorderedList | Generic List<br>fa fa-list-ul\n' +
    'ordered-list | toggleOrderedList | Numbered List<br>fa fa-list-ol\n' +
    'clean-block | cleanBlock | Clean block<br>fa fa-eraser fa-clean-block\n' +
    'link | drawLink | Create Link<br>fa fa-link\n' +
    'image | drawImage | Insert Image<br>fa fa-picture-o\n' +
    'table | drawTable | Insert Table<br>fa fa-table\n' +
    'horizontal-rule | drawHorizontalRule | Insert Horizontal Line<br>fa fa-minus\n' +
    'preview | togglePreview | Toggle Preview<br>fa fa-eye no-disable\n' +
    'side-by-side | toggleSideBySide | Toggle Side by Side<br>fa fa-columns no-disable no-mobile\n' +
    'fullscreen | toggleFullScreen | Toggle Fullscreen<br>fa fa-arrows-alt no-disable no-mobile\n' +
    'guide | [This link](https://simplemde.com/markdown-guide) | Markdown Guide<br>fa fa-question-circle\n';

// var data=fs.readFileSync(__dirname + '/test.md'  ,"utf-8");
// console.log(data);
console.log(marked(val));