const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const width = 430 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#networkSvg")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("./computer_network.json").then(data => {

  const link = svg.selectAll("line")
    .data(data.links)
    .enter()

    .append("line")
    .style("stroke", "#aaa");

  const node = svg.selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2")
  

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
  }

}).catch(error => {
  console.error("Erro carregar o grafo:", error);
});