export function sortHandler(a, b) {
    const tokenize = str =>
      str
        .toLowerCase()
        .split(/(\d+)/)
        .map(s => (/\d+/.test(s) ? parseInt(s, 10) : s));
  
    const aa = tokenize(a);
    const bb = tokenize(b);
  
    for (let i = 0; i < Math.max(aa.length, bb.length); i++) {
      if (aa[i] === undefined) return -1;
      if (bb[i] === undefined) return 1;
  
      if (aa[i] < bb[i]) return -1;
      if (aa[i] > bb[i]) return 1;
    }
    return 0;
  }
  