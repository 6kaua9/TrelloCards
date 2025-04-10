function criarQuadro(){
    const quadros = JSON.parse(localStorage.getItem("quadros")) || [];
    const nome = document.getElementById('nomeQuadro').value;
    if(nome === ""){
        alert("A area não pode estar vazia");
        return;
    }
    for(let i = 0; i < quadros.length; i++){
        if(quadros[i].toString() === nome){
            alert("Já existe um quadro com este nome");
            return;
        }
    }
        quadros.push(nome);
    localStorage.setItem("quadros", JSON.stringify(quadros));
    alert("Novo quadro criado");
}

function botaoNovoQuadro(){
    console.log("clickado");
    const doc = document.getElementById("novoQuadro");

        if(doc.style.display === 'none'){
            doc.style.display = 'flex';
            console.log(" Visivel");
            
        } else if(doc.style.display === "flex"){
            doc.style.display = "none";
            console.log("'invisivel'");
        }
}

function test12(){
    const doc=document.getElementById("teste");
    doc.style.backgroundColor="black";
}
