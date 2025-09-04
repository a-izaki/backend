

const calcularMediaAluno = (a1, a2, a3) => {
    if (a1 === undefined || a2 === undefined ) {
        throw new Error("Notas a1, a2 ou a3 não informadas");
      } 

    if (a1 < 0 || a2 < 0 ) {
        throw new Error("As notas não podem ser negativas.");
    }

    if (a3 === undefined) {
       return a1 * 0.4 + a2 * 0.6
    }

    if (a3 < 0){
        throw new Error("A nota a3 não pode ser negativa.");
    }

    return Math.max(a1*0.4 + a3*0.6, a3*0.4+a2*0.6);

};
module.exports = { calcularMediaAluno };