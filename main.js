/**
 * 一文クラス
 */
class sentence{
    /**
     * @param {string} str 一文
     * @param {number} lineNum 行番号
     */
    constructor(str, lineNum){
        this.sentenceStr = str;
        this.lineNum = lineNum;
        this.classes = new Set();
    }

    addClass(str){
        this.classes.add(str);
    }

    deleteClass(str){
        this.classes.delete(str);
    }
}

/** 文章 一文の配列*/
var sentences = new Array();

/**
 * 生テキストファイルを読み込む。
 * @param input onchange()のときのthis
 */
function loadOriginal(input){
    let file = input.files[0];
    let reader = new FileReader();
    let idElement = document.getElementById('sentenceParent');
    reader.readAsText(file);
    reader.onload = () => {
        let lines = splitText(reader.result)
        let linesNum = lines.length;
        for(let i=0; i<linesNum; i++){
            sentences.push(new sentence(lines[i], i));          //文字列クラスを文章に入れていく
        }
        // console.log(sentences);
        let table = document.createElement('table')             //テーブル作成
        for(const s of sentences){                              //作ったsentencesから一文ずつ取り出してテーブルを作る
            let onelineText = table.insertRow();                //trタグ追加
            onelineText.id = 'line' + s.lineNum.toString();
            onelineText.className = 'line';
            let td = onelineText.insertCell();                  //tdタグ追加
            td.classList.add('lineNum');
            td.innerHTML = s.lineNum;
            td = onelineText.insertCell();                      //tdタグ追加
            td.innerHTML = s.sentenceStr;
        }
        idElement.appendChild(table);                           //作ったテーブルを子要素として追加
    };
    
}

/**
 * FileReader.readAsText()で読み込んだテキストを改行区切りにする。
 * @param {string} rawtext 元のテキストデータ
 * @return {string} 改行区切り文字列配列 
 */
function splitText(rawtext){
    var lines = rawtext.split('\n');
    return lines;
}

/**
 * 行番号を右揃えにするために気合でスペースを入れる。使ってない。
 * @param {number} num 行番号
 * @param {number} linesNum 行数
 * @return {string} スペース入り行番号文字列
 */
function makeLineNumber(num, linesNum){
    let digits = linesNum.toString().length;
    let numstr = "";
    for(let i=num.toString().length; i<digits; i++){
        numstr += '&nbsp';
    }
    numstr += num.toString();
    return numstr;
}