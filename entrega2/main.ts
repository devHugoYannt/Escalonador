import { BlocoMemoria, Memoria } from "./memoria";
import { Processo, GeradorDeProcessos } from "./processo";
import { firstFit, nextFit, bestFit, worstFit } from "./algoritmo";

// -------- Mapa de algoritmos --------
const algoritmosMap = {
  first: firstFit,
  next: nextFit,
  best: bestFit,
  worst: worstFit,
} as const;

type NomeAlgoritmo = keyof typeof algoritmosMap;

// -------- Função main --------
export async function main(nomeAlgoritmo: NomeAlgoritmo, repeticoes = 100) {
  const algoritmo = algoritmosMap[nomeAlgoritmo];

  // Acumuladores globais
  let somaTamanhoProcessos = 0;
  let totalProcessosGerados = 0;
  let somaOcupacaoPorSegundo = 0;
  let totalSegundos = 0;
  let totalDescartados = 0;

  for (let r = 0; r < repeticoes; r++) {
    const memoria = new Memoria(1000);
    const processosAtivos: Processo[] = [];

    for (let tempo = 0; tempo < 100; tempo++) {
      // cria 2 processos
      for (let i = 0; i < 2; i++) {
        const p = GeradorDeProcessos.gerar();
        totalProcessosGerados++;
        somaTamanhoProcessos += p.tamanho;

        if (memoria.alocar(p, algoritmo)) {
          processosAtivos.push(p);
        } else {
          totalDescartados++;
        }
      }

      // remove 1 ou 2 aleatórios
      const qtdRemover = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < qtdRemover && processosAtivos.length > 0; i++) {
        const idx = Math.floor(Math.random() * processosAtivos.length);
        const removido = processosAtivos.splice(idx, 1)[0];
        if (removido) memoria.desalocar(removido);
      }

      // acumula ocupação da memória
      const ocupacaoAtual = (100 * processosAtivos.reduce((sum, p) => sum + p.tamanho, 0)) / memoria.tamanhoTotal;
      somaOcupacaoPorSegundo += ocupacaoAtual;
      totalSegundos++;
    }
  }

  // Calcula métricas globais
  const tamanhoMedioProcessos = somaTamanhoProcessos / totalProcessosGerados;
  const ocupacaoMediaMemoria = somaOcupacaoPorSegundo / totalSegundos;
  const taxaDescarte = (totalDescartados / totalProcessosGerados) * 100;

  console.log("\n===== MÉTRICAS GLOBAIS =====");
  console.log(`Tamanho médio dos processos gerados: ${tamanhoMedioProcessos.toFixed(2)}`);
  console.log(`Ocupação média da memória (%): ${ocupacaoMediaMemoria.toFixed(2)}`);
  console.log(`Taxa de descarte (%): ${taxaDescarte.toFixed(2)}`);
}
