export function calculateCargoBays(cargoBoxes) {
    const totalCargoBoxes = cargoBoxes.split(',').map(Number);
    return Math.ceil(totalCargoBoxes.reduce((acc, curr) => acc + curr, 0) / 10);
  }
  
  export function displayShipments(shipments) {
    const shipmentList = document.querySelector('.group ul');
    shipmentList.innerHTML = '';
    shipments.forEach(shipment => {
      const shipmentItem = document.createElement('li');
      const companyLink = document.createElement('a');
      companyLink.textContent = shipment.name;
      companyLink.href = '#';
      companyLink.addEventListener('click', () => {
        const companyNameInput = document.querySelector('#companyname');
        const emailInput = document.querySelector('#gmail');
        const cargoBoxInput = document.querySelector('.cargobox');
        const cargoBaysSpan = document.querySelector('.spanofnumbercargo');
        const companyTitle = document.querySelector('.blackdiv h4');
        const companyEmail = document.querySelector('.blackdiv span.test');
  
        companyNameInput.textContent = shipment.name;
        emailInput.textContent = shipment.email;
        cargoBoxInput.value = shipment.boxes;
        if(cargoBoxInput.value){
          let numsArray = shipment.boxes.split(',');
          
          const sum = numsArray.map(parseFloat).reduce((acc, curr) => acc + curr, 0);
  
          orderBoxes = Math.ceil(sum/10);
          return cargoBaysSpan.innerHTML = orderBoxes;
        } else {
          return cargoBaysSpan.innerHTML = "NOTHING";
        }
        cargoBaysSpan.textContent = `Number of required cargo bays: ${shipment.cargo_bays}`;
        companyTitle.textContent = shipment.name;
        companyEmail.textContent = shipment.email;
      });
      shipmentItem.appendChild(companyLink);
      shipmentList.appendChild(shipmentItem);
    });
  }
  
  export async function fetchAllShipments() {
    const response = await fetch('https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json');
    const data = await response.json();
    return data.map(shipmentData => new Shipment(shipmentData.id, shipmentData.name, shipmentData.boxes, shipmentData.email));
  }
  