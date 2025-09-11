import { Escalonador } from "./escalonador.js";
import { Processo } from "./processos.js";

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
        console.log(`Interrupção de clock após ${this.contadorCiclos} ciclos.`);
        this.processoAtual = this.escalonador.proximoProcesso();
        this.contadorCiclos = 0;
      }

      await sleep(500);
    }
  }
}

export { CPU };
