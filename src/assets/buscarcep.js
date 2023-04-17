function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('address').value=("");
    document.getElementById('province').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");

}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('address').value=(conteudo.address);
    document.getElementById('province').value=(conteudo.province);
    document.getElementById('city').value=(conteudo.city);
    document.getElementById('state').value=(conteudo.state);

} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var postalCode = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (postalCode != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(postalCode)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('address').value="...";
        document.getElementById('province').value="...";
        document.getElementById('city').value="...";
        document.getElementById('state').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ postalCode + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};