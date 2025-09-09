import { GeradorDeProcessos } from "./processos";
import { Escalonador } from "./escalonador";
import { CPU } from "./cpu";

async function main() {
  // Criando escalonador (RR = Round Robin, FCFS = First-Come First-Served, SJF = Shortest Job First)
  const escalonador = new Escalonador("RR", 3);

  // Criar processos 
  for (let i = 0; i < 5; i++) {
    escalonador.adicionarProcesso(GeradorDeProcessos.gerar());
  }

  console.log("Simulação iniciada...");

// Número de ciclos antes da interrupção
  const cpu = new CPU(escalonador, 3);

  // Iniciar simulação
  await cpu.iniciar();
}

main();
