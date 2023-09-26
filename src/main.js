import { getSelectedNodes, createGraph, updateGraphUnicast, updateGraphBroadcast, resetGraph } from './scripts/graphRenderer.js';

const selectElement = document.getElementById('inputGroupSelect');
const headerElement = document.getElementById('header');
const instructionElement = document.getElementById('instruction');
const explanationElement = document.getElementById('explanation');
const sendButton = document.getElementById('sendBtn');
const resetButton = document.getElementById('resetBtn');

function handleSelectChange() {
  if (selectElement.value !== "") {
    headerElement.textContent = selectElement.options[selectElement.selectedIndex].text;

    switch (selectElement.value) {
      case "1":
        explanationElement.textContent = "A comunicação broadcast é um tipo de comunicação de rede em que os dados são transmitidos de um único remetente para todos os dispositivos na rede."
        instructionElement.textContent = "Escolha um vértice, a partir dele todos os outros vértices do componente conectado serão alcançados. Para escolher, basta clicar no vértice.";
        break;
      case "2":
        explanationElement.textContent = "A comunicação unicast é um tipo de comunicação em que os dados são transmitidos de um único remetente para um único destinatário. Isso significa que a informação é direcionada especificamente para um dispositivo específico na rede."
        instructionElement.textContent = "Escolha dois vértices, o primeiro será o remetente e o segundo o destinatário. Para escolher, basta clicar no vértice.";
        break;
      default:
        instructionElement.textContent = "";
    }
  }
}

let sourceNodeId
let destinationNodeId

function handleSendButtonClick() {
  const selectedOption = selectElement.value;
  const selectedNodes = getSelectedNodes();

  switch (selectedOption) {
    case "1":
      sourceNodeId = selectedNodes[0];
      updateGraphBroadcast(sourceNodeId);
      break;
    case "2":
      sourceNodeId  = selectedNodes[0];
      destinationNodeId = selectedNodes[1];
      updateGraphUnicast(sourceNodeId, destinationNodeId);
      break;
    default:
      break;
  }
}

function handleResetButtonClick() {
  resetGraph()
}

selectElement.addEventListener('change', handleSelectChange);
sendButton.addEventListener('click', handleSendButtonClick);
resetButton.addEventListener('click', handleResetButtonClick);


createGraph();

window.addEventListener('load', function() {
  selectElement.selectedIndex = 0;
});
