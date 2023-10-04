// Gustavo Gomes Contiero  SC3037754
// Matheus Henrique Souza Carvalho SC3037801
let removeButtons = document.querySelectorAll(".rem");
let plusButtons = document.querySelectorAll(".plus");
let minusButtons = document.querySelectorAll(".minus");
let topButtons = document.querySelectorAll("div button");
let inputBox = document.querySelector("input");

function notasAluno(aluno){
    let notas = [];
    for(let i=0; i<3;i++){
        notas.push(parseFloat(aluno.children[i+1].innerText));
    }
    return notas;
}

function atualizarStatus(aluno,media){
    let status = "";
    if(media>=6){
        status = "Aprovado";
    }
    else{
        if(media>=3){
            status = "Recuperação";
        }
        else{
            status = "Reprovado";
        }
    }
    aluno.children[5].innerText = status;
}

function adicionaEventoDiminuir(botao){
    function diminuiNotas(aluno,notas){
        for(let i=0;i<notas.length;i++){
            notas[i] = notas[i] - 0.5;
            if(notas[i] <= 0){
                notas[i] = 0;
            }
        }
        for(let i=0;i<notas.length;i++){
            aluno.children[i+1].innerText = notas[i].toFixed(1);
        }
        return notas;
    }

    botao.addEventListener("click" , (e) =>{

        let alunoClick = e.target.parentElement.parentElement;
        let notas = notasAluno(alunoClick);
        diminuiNotas(alunoClick,notas);
        let media = calcularMedia(notas).toFixed(2);
        atualizarStatus(alunoClick,media);
        alunoClick.children[4].innerText = media;
    })
}

function adicionaEventoAumentar(botao){
    function aumentarNotas(aluno,notas){
        for(let i=0;i<notas.length;i++){
            notas[i] = notas[i] + 0.5;
            if(notas[i] >= 10){
                notas[i] = 10;
            }
        }
        for(let i=0;i<notas.length;i++){
            aluno.children[i+1].innerText = notas[i].toFixed(1);
        }
        return notas;
    }


    botao.addEventListener("click" , (e) =>{

        let alunoClick = e.target.parentElement.parentElement;
        let notas = notasAluno(alunoClick);
        aumentarNotas(alunoClick,notas);
        let media = calcularMedia(notas).toFixed(2);
        atualizarStatus(alunoClick,media);
        alunoClick.children[4].innerText = media;
    })

}

function adicionaEventoRemover(botao){

    botao.addEventListener("click",(e) =>{

        element = e.target.parentElement.parentElement;
        element.remove();
    })

}

function criaBotao(ondeAdicionar){
    //Aumentar Nota
    let botao = document.createElement("button");
    botao.innerText = "Aumentar nota";
    ondeAdicionar.append(botao);
    botao.classList.add("button", "is-primary" , "plus");
    adicionaEventoAumentar(botao);
    //Diminuir nota
    botao = document.createElement("button");
    botao.innerText = "Diminuir nota";
    ondeAdicionar.append(botao);
    botao.classList.add("button", "is-info" , "minus");
    adicionaEventoDiminuir(botao);
    //Remover
    botao = document.createElement("button");
    botao.innerText = "Remover";
    ondeAdicionar.append(botao);
    botao.classList.add("button", "is-warning" , "rem");
    adicionaEventoRemover(botao);
}

function pegaNome(){
    let valorInput = document.querySelector("input").value;
    document.querySelector("input").value = "";
    console.log(valorInput);
    return valorInput;
}

function adicionaInfo(ondeAdicionar,valor){
    let tdNovo = document.createElement("td");
    tdNovo.innerText = valor;
    ondeAdicionar.append(tdNovo);
    console.log(tdNovo);
    return tdNovo;
}

function criaAluno(corpoTabela,valorInput){
    let trNovo = document.createElement("tr");
    corpoTabela.append(trNovo);
    adicionaInfo(trNovo,valorInput);
    let notas = [];
    for(let j=0;j<3;j++){
        notas.push(parseFloat(adicionaInfo(trNovo,geraNota()).innerText));
        console.log("notas:" + notas);
    }
    let media = calcularMedia(notas);
    adicionaInfo(trNovo,media.toFixed(2));
    adicionaInfo(trNovo,"");
    atualizarStatus(trNovo,media);
    let tdNovo = adicionaInfo(trNovo,"");
    console.log(tdNovo);
    criaBotao(tdNovo);
}

function calcularMedia(notas){
    let soma = 0;
    for (let i = 0; i<3 ;i++){
        soma = soma + parseFloat(notas[i]);
    }
    let media = soma/3;
    return media;
}

function acharMedias(alunos){
    function pegarMediaAluno(aluno){
        let media = parseFloat(aluno.children[4].innerText);
        return media; 
    }

    let medias = [];
    for(let i = 0; i<alunos.length;i++){
        medias.push(pegarMediaAluno(alunos[i]));
    }
    return medias;
}

// Botão remover
for(let i = 0; i<removeButtons.length;i++){
    adicionaEventoRemover(removeButtons[i]);
}

// Botão Aumentar nota
for(let i = 0 ; i<plusButtons.length ; i++){
    adicionaEventoAumentar(plusButtons[i]);
}

// Botão Diminuir nota
for(let i = 0 ; i<minusButtons.length ; i++){
    adicionaEventoDiminuir(minusButtons[i]);
}

// Botões Topo
for(let i = 0; i<topButtons.length; i++){

    topButtons[i].addEventListener("click", (e) => {
        element = e.target; 
        switch(element.innerText){

            case "Adicionar aluno":
                //Adicionar Aluno
                let corpoTabela = document.querySelector("tbody");
                
                if(corpoTabela.children.length>=10){
                    break;
                }

                
                let valorInput = pegaNome();
                
                console.log("Adicionando novo aluno");
                inputBox.classList.remove("valid");
                inputBox.classList.add("invalid");
                topButtons[0].setAttribute("disabled","");
                criaAluno(corpoTabela,valorInput);

                break;
            case "Remover pior aluno":
                // Remover pior Aluno
                console.log("Excluindo Pior Aluno");

                let alunos = document.querySelectorAll("tbody tr");

                if(alunos.length <= 0){
                    alert("Não há mais alunos para excluir");
                    break;
                }

                let medias = acharMedias(alunos);
                let indiceRemoverAluno = 0;
                let menorMedia = parseFloat(medias[0]);

                for(let j = 0; j<medias.length; j++){
                    if(parseFloat(medias[j]) < menorMedia){
                        menorMedia = medias[j];
                        indiceRemoverAluno = j;
                    }
                }
                
                console.log(indiceRemoverAluno);
                alunos[indiceRemoverAluno].remove();

                break;
        }
    })

}

// Cores Input
inputBox.classList.add("invalid");
topButtons[0].setAttribute("disabled","");
inputBox.addEventListener("keyup",(e)=>{
    let inputBox = e.target;
    if(inputBox.value != ""){
        // Valido
        if(inputBox.classList.contains("invalid")){
            inputBox.classList.remove("invalid");
            topButtons[0].removeAttribute("disabled");
        }
        if(! inputBox.classList.contains("valid")){
            inputBox.classList.add("valid");
        }
    }
    else{
        // Inválido
        if(inputBox.classList.contains("valid")){
            inputBox.classList.remove("valid");
        }
        if(! inputBox.classList.contains("invalid")){
            inputBox.classList.add("invalid");
            topButtons[0].setAttribute("disabled","");
        }
    }
})