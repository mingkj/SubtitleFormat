window.onload = function () {
    document.getElementById("button").setAttribute("onclick", "format()");
    document.getElementById("input").setAttribute("onkeydown", "enterkey()");

    document.getElementById("file").addEventListener('change', fileSelect, false);
}
// function enterkey() {
var enterkey = function () {
    // enter 13, whitespace 20
    if (event.keyCode == 32) { format(); }
}

// 格式化字幕文件
// function format() {
var format = function () {
    var subtitle = ' ';
    // 1个参数的 的时候
    if (arguments.length === 1) {
        subtitle = arguments[0];
    }
    // 无参数的时候
    else  {
        subtitle = document.getElementById("input").value;
        // console.log(arguments[0]);// undefined
    }
    // var subtitle = document.getElementById("input").value;

    // 字幕格式 13 换行 00:00:34,042 --> 00:00:35,494
    var text = subtitle.replace(/(\n.|\n..|\n...|.)\n[0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9] --> [0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]\n/g, ' ');

    //replace() 方法的参数 replacement 可以是函数而不是字符串 
    // 合并行尾不是 . 或者 ? 的行，不替换匹配到的第一个字符
    text = text.replace(/[^.?](\n|\n\n)/g, function (s) {
        //  text=text.replace(/[^.?](\n|\n\n|\s\n|\s\n\n)/g,function (s)
        return s.substring(0, 1) + ' ';
    });

    // remove more space
    do {
        text = text.replace('  ', ' ');
    } while (text.indexOf('  ') !== -1);

    document.getElementById("input").value = text;
}

// 文件选择
function fileSelect(evt) {
    var files = this.files;
    /* var fileName = '';
     // var html=new Array();
     for (var i = 0, l = files.length; i < l; i++) {
         var file = files[i];
 
         fileName += '<p>' + file.name + ' - ' + file.size + ' bytes' + '</p>';
 
     }
 
     // console.log(fileName);
     document.getElementById("file-list").innerHTML = fileName;*/

    var reader = new FileReader();
    reader.readAsText(files[0], "UTF-8");
    reader.onload = loaded;
}

function loaded(evt) {
    var fileString = evt.target.result;
    format(fileString);
}

