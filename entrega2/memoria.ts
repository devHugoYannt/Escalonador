import { Processo } from "./processo";

class BlocoMemoria {
  inicio: number;
  tamanho: number;
  processo: Processo | null;
  prox: BlocoMemoria | null;

  constructor(inicio: number, tamanho: number, processo: Processo | null = null) {
    this.inicio = inicio;
    this.tamanho = tamanho;
    this.processo = processo;
    this.prox = null;
  }
}

export class Memoria {
  tamanhoTotal: number;
  cabeca: BlocoMemoria;

  constructor(tamanhoTotal: number) {
    this.tamanhoTotal = tamanhoTotal;
    this.cabeca = new BlocoMemoria(0, tamanhoTotal, null); // começa toda livre
  }

  // alocar usando função de escolha (algoritmo)
  alocar(processo: Processo, estrategia: (blocos: BlocoMemoria[], p: Processo) => BlocoMemoria | null): boolean {
    const blocosLivres = this.listarBlocosLivres();
    const escolhido = estrategia(blocosLivres, processo);

    if (!escolhido) {
      console.log(`X Não há espaço para P${processo.id} (${processo.tamanho})`);
      return false;
    }

    if (escolhido.tamanho > processo.tamanho) {
      const novo = new BlocoMemoria(escolhido.inicio + processo.tamanho, escolhido.tamanho - processo.tamanho, null);
      novo.prox = escolhido.prox;
      escolhido.prox = novo;
      escolhido.tamanho = processo.tamanho;
    }

    escolhido.processo = processo;
    console.log(` P${processo.id} (${processo.tamanho}) alocado em [${escolhido.inicio} - ${escolhido.inicio + processo.tamanho - 1}]`);
    return true;
  }

  desalocar(processo: Processo) {
    let atual: BlocoMemoria | null = this.cabeca;
    while (atual) {
      if (atual.processo?.id === processo.id) {
        atual.processo = null;
        console.log(`+ Processo P${processo.id} desalocado.`);
        this.fundirLivres();
        return;
      }
      atual = atual.prox;
    }
  }

  private fundirLivres() {
    let atual = this.cabeca;
    while (atual && atual.prox) {
      if (!atual.processo && !atual.prox.processo) {
        atual.tamanho += atual.prox.tamanho;
        atual.prox = atual.prox.prox;
      } else {
        atual = atual.prox;
      }
    }
  }

  private listarBlocosLivres(): BlocoMemoria[] {
    const livres: BlocoMemoria[] = [];
    let atual: BlocoMemoria | null = this.cabeca;
    while (atual) {
      if (!atual.processo) livres.push(atual);
      atual = atual.prox;
    }
    return livres;
  }
}

export { BlocoMemoria };