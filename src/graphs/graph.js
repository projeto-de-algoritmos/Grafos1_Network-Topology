const graph = {
    A: ['E'],
    B: ['E'],
    C: ['E'],
    D: ['E'],
    E: ['A','B','C','D','J'],
  
    F: ['J'],
    G: ['J'],
    H: ['J'],
    I: ['J'],
    J: ['E','F','G','H','I','O'],
  
    K: ['O'],
    L: ['O'],
    M: ['O'],
    N: ['O'],
    O: ['J','K','L','M','N']
};

export { graph }