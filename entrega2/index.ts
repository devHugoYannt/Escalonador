import * as readline from "readline";
import { main } from "./main";

const algoritmosMap = ["first", "next", "best", "worst"] as const;
type NomeAlgoritmo = typeof algoritmosMap[number];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Escolha o algoritmo de alocação de memória:");
console.log("1 - First Fit");
console.log("2 - Next Fit");
console.log("3 - Best Fit");
console.log("4 - Worst Fit");

rl.question("Digite o número do algoritmo desejado: ", async (answer) => {
  const index = parseInt(answer) - 1;
  if (index >= 0 && index < algoritmosMap.length && algoritmosMap[index] !== undefined) {
    const escolhido: NomeAlgoritmo = algoritmosMap[index];

    console.log(`Algoritmo escolhido: ${escolhido}`);
    console.log("Iniciando simulação...\n");

    // Chamamos o main com atualização por repetição
    await main(escolhido);

    console.log("\nSimulação finalizada.");
    rl.close();
  } else {
    console.log("Opção inválida. Encerrando.");
    rl.close();
  }
});
