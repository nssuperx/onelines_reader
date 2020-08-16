function loadOriginal(input){
    console.log(input.files[0]);
    let file = input.files[0];
    let reader = new FileReader();
    let idElement = document.getElementById('parent');
    reader.readAsText(file);
    reader.onload = () => {
        let lines = splitText(reader.result)
        console.log(lines);

        for(let i=0; i<lines.length; i++){
            let onelineText = document.createElement('div');
            onelineText.id = 'line' + i.toString();
            onelineText.className = 'line';
            onelineText.innerHTML = '| ' + ('0000' + i.toString()).substr(-4) + ' | ' + lines[i];
            idElement.appendChild(onelineText);
        }
    };
    
}

function splitText(rawtext){
    var lines = rawtext.split('\n');
    return lines;
}