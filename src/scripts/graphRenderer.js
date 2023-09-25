import { bfsShortestPath } from './bfs.js'
import { graph } from '../graphs/graph.js'

function graphRenderer() {

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 430 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#networkSvg")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", `translate(${margin.left},${margin.top})`)

    d3.json("data/computer_topology.json").then(data => {

        const idToNameMap = {};
        data.nodes.forEach(node => {
            idToNameMap[node.id] = node.name;
        });

        const shortestPath = bfsShortestPath(graph, 'A', 'O')

        function isOnShortestPath(nodeId) {
            const nodeName = idToNameMap[nodeId];
            return shortestPath.includes(nodeName);
        }
        
        
        const link = svg.selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", d => isOnShortestPath(d.source) && isOnShortestPath(d.target) ? "orange" : "#aaa")
        .style("stroke-width", 2)
        

        const node = svg.selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .style("fill", d => isOnShortestPath(d.id) ? "orange" : "#69b3a2")

        const nodeText = svg.selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
            .attr("x", d => d.x + 25) 
            .attr("y", d => d.y - 25) 
            .text(d => idToNameMap[d.id])
        
        
        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink()
            .id(d => d.id)
            .links(data.links)
            )
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);


        function ticked() {
            link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            node
            .attr("cx", d => d.x + 6)
            .attr("cy", d => d.y - 6)
            nodeText
            .attr("x", d => d.x)
            .attr("y", d => d.y)
        }

    }).catch(error => {
        console.error("Erro carregar o grafo:", error);
    });

}

export { graphRenderer };