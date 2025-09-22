// -------- Entidade Processo --------
class Processo {
  id: number;
  tamanho: number;

  constructor(id: number, tamanho: number) {
    this.id = id;
    this.tamanho = tamanho;
  }
}

// -------- Gerador de Processos --------
class GeradorDeProcessos {
  private static proximoId: number = 1;

  static gerar(): Processo {
    const id = this.proximoId++;
    const tamanho = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    return new Processo(id, tamanho);
  }
}

export { Processo, GeradorDeProcessos };
