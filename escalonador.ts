
import { Processo, GeradorDeProcessos } from "./processos";



type Algoritmo = "FCFS" | "SJF" | "RR";

class Escalonador {
  private fila: Processo[] = [];
  private algoritmo: Algoritmo;
  private indiceAtual: number = 0;
  private contadorQuantum: number = 0;
  private quantum: number;

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
        return this.fila[0] ?? null;

      case "SJF":
        this.fila.sort((a, b) => a.quantidadeInstrucoes - b.quantidadeInstrucoes);
        return this.fila[0] ?? null;

      case "RR":
        const processo = this.fila[this.indiceAtual];
        this.contadorQuantum++;

        // Troca de processo quando atinge o quantum
        if (
          this.contadorQuantum >= this.quantum ||
          (processo !== undefined && processo.estaFinalizado())
        ) {
          this.contadorQuantum = 0;
          this.indiceAtual = (this.indiceAtual + 1) % this.fila.length;
        }

        return processo ?? null;
    }
  }

  removerFinalizados(): void {
    this.fila = this.fila.filter((p) => !p.estaFinalizado());
    if (this.indiceAtual >= this.fila.length) this.indiceAtual = 0;
  }

  temProcessos(): boolean {
    return this.fila.length > 0;
  }
}

export { Processo, GeradorDeProcessos, Escalonador };