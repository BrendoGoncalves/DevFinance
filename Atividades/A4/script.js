const masks={
    cep(value){
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    },
}

function limpa_formulário_cep() {
    document.getElementById('uf').value=("");
    document.getElementById('casos').value=("");
    document.getElementById('mortes').value=("");
    document.getElementById('suspeitos').value=("");
    document.getElementById('curados').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('uf').value=(conteudo.uf);
    }else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {

            document.getElementById('uf').value="...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
};

function meu_callback2(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('casos').value=(conteudo.cases);
        document.getElementById('mortes').value=(conteudo.deaths);
        document.getElementById('suspeitos').value=(conteudo.suspects);
        document.getElementById('curados').value=(conteudo.refuses);
    }
}
    
function pesquisacovid(valor2) {
    
    var state = valor2;
    
    if (state != "") {
            document.getElementById('casos').value="...";
            document.getElementById('mortes').value="...";
            document.getElementById('suspeitos').value="...";
            document.getElementById('curados').value="...";
    
            var script2 = document.createElement('script');
    
            script2.src = 'https://covid19-brazil-api.now.sh/api/report/v1'+ state + '/json/?callback=meu_callback2';
    
            document.body.appendChild(script2);
        
    } else {
        alert("Sem UF!");
    }
};


document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value)
    }, false)
})