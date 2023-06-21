function ValidadorCPF(cpfenviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function(){
            return cpfenviado.replace(/\D+/g, ''); // Retirando tudo oq não é número vai ser substituido por nada
        }
    });
}

ValidadorCPF.prototype.valida = function(){
    console.log(this.cpfLimpo)
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2); //Pegando somente os 9 primeiros digitos do CPF
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
};

ValidadorCPF.prototype.criaDigito = function (cpfParcial){
    const arrayCpf = Array.from(cpfParcial);

    let regressivo = arrayCpf.length + 1;
    const total = arrayCpf.reduce((somador, valor) => {
        somador += (regressivo * Number(valor));
        regressivo--;
        return somador;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito); // Se o digito for maior que 9 seta 0 senão retorna o digito
}

ValidadorCPF.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.lenght); // Vendo se o primeiro numero e igual ao resto do cpf
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidadorCPF('705.484.450-52');
const cpf2 = new ValidadorCPF('470.424.390-74');

// cpf.valida()
cpf2.valida()

export default ValidadorCPF;