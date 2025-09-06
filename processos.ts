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
export { Processo, GeradorDeProcessos };

