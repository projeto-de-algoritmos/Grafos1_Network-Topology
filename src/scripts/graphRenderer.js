import { graph } from '../graphs/graph.js';
import { bfsShortestPath, bfs } from './bfs.js';

const width = 430;
const height = 400;

let selectedNodes = [];

const svg = d3.select("#networkSvg")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

function createGraph() {
    const idToNameMap = {};

    d3.json("data/computer_topology.json").then(data => {
        data.nodes.forEach(node => {
            idToNameMap[node.id] = node.name;
        });

        const link = svg.selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .style("stroke", "#aaa")
            .style("stroke-width", 2);

        const node = svg.selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("id", d => `${d.name}`)
            .style("fill", "#69b3a2")
            .on("click", d => handleNodeClick(d))
            .on("mouseover", function() {
                d3.select(this).style("cursor", "pointer"); 
              });

        const nodeText = svg.selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
            .attr("x", d => d.x + 25)
            .attr("y", d => d.y - 25)
            .text(d => idToNameMap[d.id])
            .on("mouseover", function() {
                d3.select(this).style("cursor", "pointer"); 
              });
            

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
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x + 6)
                .attr("cy", d => d.y - 6);
            nodeText
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        }
    }).catch(error => {
        console.error("Erro ao carregar o grafo:", error);
    });
}

function handleNodeClick(clickedNode) {
    const selectedOption = document.getElementById("inputGroupSelect").value;
    const existAlert = document.querySelector(".alert");

    
    switch (selectedOption) {
        case "1":
            if(selectedNodes.includes(clickedNode.target.id)) {
                selectedNodes.pop(clickedNode.target.id)
                d3.select("#"+clickedNode.target.id).style("fill", "#69b3a2")
            } else {
                if(!existAlert) {
                    if (selectedNodes.length + 1 <= 1) {
                        selectedNodes.push(clickedNode.target.id)
                        d3.select("#"+clickedNode.target.id).style("fill", "orange")
                    } else {
                        const alertDiv = document.createElement("div");
                        alertDiv.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
                        alertDiv.innerHTML = `
                            Não pode adicionar mais.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        `;
                        document.getElementById("alert-container").appendChild(alertDiv);
                    }
                }
                
            }                        
            break;
        case "2":
            if(selectedNodes.includes(clickedNode.target.id)) {
                selectedNodes.pop(clickedNode.target.id)
                d3.select("#"+clickedNode.target.id).style("fill", "#69b3a2")
            } else {
                if (selectedNodes.length <= 1) {
                    selectedNodes.push(clickedNode.target.id)
                    d3.select("#"+clickedNode.target.id).style("fill", "orange")
                } else {
                    if(!existAlert){
                        const alertDiv = document.createElement("div");
                    alertDiv.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
                    alertDiv.innerHTML = `
                        Não pode adicionar mais.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                    document.getElementById("alert-container").appendChild(alertDiv);
                    }
                }
            }
            break;
        default:
            break;
    }
}

function updateGraphUnicast(sourceNode, destinationNode) {
    const path = bfsShortestPath(graph, sourceNode, destinationNode);
    updateGraph(path);
}

function updateGraphBroadcast(sourceNode) {
    const path = bfs(graph, sourceNode);
    updateGraph(path);
}

function updateGraph(path) {
    path.forEach((nodeId, i) => {
        setTimeout(function () {
            d3.select("#" + nodeId).style("fill", "orange");
        }, i * 300);
    });
}

function resetGraph() {
    const svg = d3.select("#networkSvg");

    d3.json("data/computer_topology.json").then(data => {
        const node = svg.selectAll("circle")
            .style("fill", "#69b3a2");
        selectedNodes = [];
    });
}

function getSelectedNodes() {
    return selectedNodes;
}

export { createGraph, updateGraphUnicast, updateGraphBroadcast, resetGraph, getSelectedNodes };
