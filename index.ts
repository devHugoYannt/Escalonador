import { Processo, GeradorDeProcessos } from "./processos";
import { Escalonador } from "./escalonador";
import { CPU } from "./cpu";

// Criando escalonador (RR = Round Robin, FCFS = First-Come First-Served, SJF = Shortest Job First)
const escalonador = new Escalonador("FCFS", 3);

// Adiciona alguns processos
for (let i = 0; i < 5; i++) {
  escalonador.adicionarProcesso(GeradorDeProcessos.gerar());
}

// Cria CPU com interrupção a cada 3 ciclos
const cpu = new CPU(escalonador, 3);

// Inicia CPU
cpu.iniciar();
