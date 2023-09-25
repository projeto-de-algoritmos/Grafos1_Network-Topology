import { graphRenderer } from './scripts/graphRenderer.js';

const selectElement = document.getElementById('inputGroupSelect');
const headerElement = document.getElementById('header');
const instructionElement = document.getElementById('instruction')

window.addEventListener('load', function() {
  selectElement.selectedIndex = 0;
});

selectElement.addEventListener('change', function() {
    if (this.value !== "") {
      headerElement.textContent = this.options[this.selectedIndex].text;  
  
      switch (this.value) {
        case "1":
          instructionElement.textContent = "A comunicação unicast é um tipo de comunicação de rede em que os dados são transmitidos de um único remetente para um único destinatário. Isso significa que a informação é direcionada especificamente para um dispositivo específico na rede. Escolha um vértice, a partir dele todos os outros vértices do componente conectado serão alcaçados. Para escolher basta clicar no vertice";
          break;
        case "2":
          instructionElement.textContent = "A comunicação broadcast, por outro lado, é um tipo de comunicação de rede em que os dados são transmitidos de um único remetente para todos os dispositivos na rede. Escolha dois vértices, o primeiro será o source e o segundo o destination. Para escolher basta clicar no vertice.";
          break;
        default:
          instructionElement.textContent = "";
      }
    }
  });

  graphRenderer();