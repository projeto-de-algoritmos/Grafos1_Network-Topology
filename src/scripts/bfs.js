function bfsShortestPath(graph, source, destination) {
    const queue = [{ vertex: source, path: [source] }];
    const visited = new Set();

    while (queue.length) {
        const { vertex, path } = queue.shift();

        if (!visited.has(vertex)) {
            visited.add(vertex);
            if (vertex === destination) return path;
            for (const neighbor of graph[vertex]) {
                if (!visited.has(neighbor)) {
                    const newPath = [...path, neighbor];
                    queue.push({ vertex: neighbor, path: newPath });
                }
            }
        }
    }

    return [];
}


function bfs(graph, source) {
    const queue = [source];
    const visited = [];
    
    while (queue.length) {
        const vertex = queue.shift();
        if (!visited.includes(vertex)) {
            visited.push(vertex);
            for (const neighbor of graph[vertex]) {
                if (!visited.includes(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return visited;
}


export  { bfsShortestPath, bfs };

