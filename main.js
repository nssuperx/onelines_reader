/**
 * 生テキストファイルを読み込む。
 * @param input onchangeのときのthis
 */
function loadOriginal(input){
    let file = input.files[0];
    let reader = new FileReader();
    let idElement = document.getElementById('sentenceParent');
    idElement.textContent = null;
    let table = document.createElement('table')                         //テーブル作成
    table.id = 'lines';
    reader.readAsText(file);
    reader.onload = () => {
        let lines = splitText(reader.result)
        let linesNum = lines.length;
        for(let i=0; i<linesNum; i++){                                  //作ったsentencesから一文ずつ取り出してテーブルを作る
            let tr = table.insertRow();                                 //trタグ追加
            tr.id = 'line' + i.toString();
            tr.classList.add('line');
            tr.addEventListener('click', toggleLineSelect, false);
            let td = tr.insertCell();                                   //tdタグ追加
            td.classList.add('lineNum');
            td.innerHTML = i.toString();
            td = tr.insertCell();                                       //tdタグ追加
            td.innerHTML = lines[i];
        }
        idElement.appendChild(table);                                   //作ったテーブルを子要素として追加
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
 * jsonファイルを読み込む
 * @param input onchangeのときのthis
 */
function inputJson(input){
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        let text = JSON.parse(reader.result);
        let idElement = document.getElementById('sentenceParent');
        idElement.textContent = null;
        let table = document.createElement('table')                     //テーブル作成
        table.id = 'lines';
        for(let t of text){
            let tr = table.insertRow();                                 //trタグ追加
            tr.id = 'line' + t[0][1].toString();
            tr.className = t[1][1];
            tr.addEventListener('click', toggleLineSelect, false);
            let td = tr.insertCell();                                   //tdタグ追加
            td.classList.add('lineNum');
            td.innerHTML = t[0][1].toString();
            td = tr.insertCell();                                       //tdタグ追加
            td.innerHTML = t[2][1];
        }
        idElement.appendChild(table);                                   //作ったテーブルを子要素として追加
    };
}

/**
 * json形式で編集データを出力する。
 */
function outputJson(){
    let elements = document.getElementsByClassName('line');
    let out = [];
    for(let e of elements){
        let outmap = new Map();
        outmap.set('lineNumber', Number(e.getElementsByTagName('td')[0].innerHTML));
        outmap.set('classes', e.className);
        outmap.set('sentence', String(e.getElementsByTagName('td')[1].innerHTML));
        out.push([...outmap]);
    }
    let downloadData = JSON.stringify([...out]);
    let blob = new Blob([downloadData], { "type" : "text/plain" });
    document.getElementById("output").href = window.URL.createObjectURL(blob);
}

/**
 * 選択されてるかされてないかクラスを設定
 */
function toggleLineSelect(){
    this.classList.toggle('selected');
}

/**
 * 文にタグ（クラス）をつける
 */
function classSet(){
    let settings = document.getElementsByClassName('setting');
    let selectedLines = document.getElementsByClassName('selected');
    for(let setting of settings){
        if(setting.checked){
            for(let line of selectedLines){
                line.classList.add(setting.value);
            }
        }else{
            for(let line of selectedLines){
                line.classList.remove(setting.value);
            }
        }

    }
}

/**
 * 文の表示非表示
 */
function showVisibleLine(){
    let visibleFlags = document.getElementsByClassName('visibleFlag');
    let lines = document.getElementsByClassName('line');
    for(let l of lines){
        for(let v of visibleFlags){
            if(v.checked && l.classList.contains(v.value)){
                l.hidden = false;
                break;
            }else{
                l.hidden = true;
            }
        }
    }
}
