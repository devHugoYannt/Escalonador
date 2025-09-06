class Processo {
  id: number;
  quantidadeInstrucoes: number;

  constructor(id: number, quantidadeInstrucoes: number) {
    this.id = id;
    this.quantidadeInstrucoes = quantidadeInstrucoes;
  }

  executarInstrucao(): void {
    if (this.quantidadeInstrucoes > 0) {
      this.quantidadeInstrucoes--;
    }
  }

  estaFinalizado(): boolean {
    return this.quantidadeInstrucoes === 0;
  }
}

class GeradorDeProcessos {
  private static proximoId: number = 1;

  static gerar(): Processo {
    const id = this.proximoId++;
    const quantidadeInstrucoes = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    return new Processo(id, quantidadeInstrucoes);
  }
}

// -------- Exemplo de uso --------
const processo1 = GeradorDeProcessos.gerar();
console.log("Processo gerado:", processo1);

processo1.executarInstrucao();
console.log("Após executar 1 instrução:", processo1);

console.log("Está finalizado?", processo1.estaFinalizado());
