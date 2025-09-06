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

type Algoritmo = "FCFS" | "SJF" | "RR";

class Escalonador {
  private fila: Processo[] = [];
  private algoritmo: Algoritmo;
  private quantum: number;
  private contadorQuantum: number = 0;
  private indiceAtual: number = 0;

  constructor(algoritmo: Algoritmo, quantum: number = 3) {
    this.algoritmo = algoritmo;
    this.quantum = quantum;
  }

  adicionarProcesso(processo: Processo): void {
    this.fila.push(processo);
  }

  proximoProcesso(): Processo | null {
    if (this.fila.length === 0) return null;

    switch (this.algoritmo) {
      case "FCFS":
        return this.fila[0] !== undefined ? this.fila[0] : null;

      case "SJF":
        this.fila.sort((a, b) => a.quantidadeInstrucoes - b.quantidadeInstrucoes);
        return this.fila[0] !== undefined ? this.fila[0] : null;

      case "RR":
        if (this.indiceAtual >= this.fila.length) return null;
        const processo = this.fila[this.indiceAtual];
        this.contadorQuantum++;

        if (this.contadorQuantum >= this.quantum) {
          this.contadorQuantum = 0;
          this.indiceAtual = (this.indiceAtual + 1) % this.fila.length;
        }

        return processo !== undefined ? processo : null;
    }
  }

  removerFinalizados(): void {
    this.fila = this.fila.filter((p) => !p.estaFinalizado());
    if (this.indiceAtual >= this.fila.length) {
      this.indiceAtual = 0;
    }
  }
}

export { Processo, GeradorDeProcessos, Escalonador };