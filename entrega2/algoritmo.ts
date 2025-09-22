import { Processo } from "./processo";

export const firstFit = (blocos: any[], p: Processo) =>
  blocos.find(b => b.tamanho >= p.tamanho) || null;

let lastPos = 0;

export const nextFit = (blocos: any[], p: Processo) => {
  const start = lastPos;
  for (let i = 0; i < blocos.length; i++) {
    const idx = (start + i) % blocos.length;
    if (blocos[idx].tamanho >= p.tamanho) {
      lastPos = idx;
      return blocos[idx];
    }
  }
  return null;
};

export const bestFit = (blocos: any[], p: Processo) =>
  blocos.filter(b => b.tamanho >= p.tamanho).sort((a, b) => a.tamanho - b.tamanho)[0] || null;

export const worstFit = (blocos: any[], p: Processo) =>
  blocos.filter(b => b.tamanho >= p.tamanho).sort((a, b) => b.tamanho - a.tamanho)[0] || null;
