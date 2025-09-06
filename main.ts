
// Entidade Processo
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


// Gerador de Processos
class GeradorDeProcessos {
  private static proximoId: number = 1;

  static gerar(): Processo {
    const id = this.proximoId++;
    const quantidadeInstrucoes = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    return new Processo(id, quantidadeInstrucoes);
  }
}


// Escalonador
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
        return this.fila[0] ?? null;

      case "SJF":
        this.fila.sort((a, b) => a.quantidadeInstrucoes - b.quantidadeInstrucoes);
        return this.fila[0] ?? null;;

      case "RR":
        const processo = this.fila[this.indiceAtual];
        this.contadorQuantum++;

        if (this.contadorQuantum >= this.quantum) {
          this.contadorQuantum = 0;
          this.indiceAtual = (this.indiceAtual + 1) % this.fila.length;
        }

        return processo ?? null;
    }
  }

  removerFinalizados(): void {
    this.fila = this.fila.filter((p) => !p.estaFinalizado());
    if (this.indiceAtual >= this.fila.length) {
      this.indiceAtual = 0;
    }
  }

  temProcessos(): boolean {
    return this.fila.length > 0;
  }
}


// CPU
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CPU {
  private escalonador: Escalonador;
  private processoAtual: Processo | null = null;
  private ciclosPorInterrupcao: number;
  private contadorCiclos: number = 0;

  constructor(escalonador: Escalonador, ciclosPorInterrupcao: number) {
    this.escalonador = escalonador;
    this.ciclosPorInterrupcao = ciclosPorInterrupcao;
  }

  async iniciar() {
    console.log(`CPU iniciada com interrupção a cada ${this.ciclosPorInterrupcao} ciclos.`);

    while (true) {
      if (!this.processoAtual) {
        this.processoAtual = this.escalonador.proximoProcesso();
        if (!this.processoAtual) {
          console.log("Nenhum processo na fila. CPU ociosa...");
          await sleep(1000);
          continue;
        }
        console.log(`Novo processo atribuído à CPU: P${this.processoAtual.id}`);
      }

      this.processoAtual.executarInstrucao();
      console.log(
        `Executando P${this.processoAtual.id} | Instruções restantes: ${this.processoAtual.quantidadeInstrucoes}`
      );

      this.contadorCiclos++;

      if (this.processoAtual.estaFinalizado()) {
        console.log(`Processo P${this.processoAtual.id} finalizado!`);
        this.escalonador.removerFinalizados();
        this.processoAtual = null;
        this.contadorCiclos = 0;
      }

      if (this.contadorCiclos >= this.ciclosPorInterrupcao) {
        console.log(`⏸ Interrupção de clock após ${this.contadorCiclos} ciclos.`);
        this.processoAtual = this.escalonador.proximoProcesso();
        this.contadorCiclos = 0;
      }

      await sleep(500);
    }
  }
}


// -------- Main Simulação --------
async function main() {
  // Criar escalonador (mude para "FCFS" ou "SJF" se quiser testar)
  const escalonador = new Escalonador("FCFS", 3);

  // Criar processos
  for (let i = 0; i < 5; i++) {
    escalonador.adicionarProcesso(GeradorDeProcessos.gerar());
  }

  console.log("Simulação iniciada...");
  const cpu = new CPU(escalonador, 3);
  await cpu.iniciar();
}

main();
