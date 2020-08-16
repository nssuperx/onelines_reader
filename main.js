class sentence{
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

var sentences = new Array();

function loadOriginal(input){
    let file = input.files[0];
    let reader = new FileReader();
    let idElement = document.getElementById('sentenceParent');
    reader.readAsText(file);
    reader.onload = () => {
        let lines = splitText(reader.result)
        let linesNum = lines.length;
        for(let i=0; i<linesNum; i++){
            sentences.push(new sentence(lines[i], i));
        }
        console.log(sentences);

        for(const s of sentences){
            let onelineText = document.createElement('div');
            onelineText.id = 'line' + s.lineNum.toString();
            onelineText.className = 'line';
            onelineText.innerHTML = makeLineNumber(s.lineNum, linesNum) + ' | ' + s.sentenceStr;
            idElement.appendChild(onelineText);
        }
    };
    
}

function splitText(rawtext){
    var lines = rawtext.split('\n');
    return lines;
}

function makeLineNumber(num, linesNum){
    let digits = linesNum.toString().length;
    let numstr = "";
    for(let i=num.toString().length; i<digits; i++){
        numstr += '&nbsp';
    }
    numstr += num.toString();
    return numstr;
}