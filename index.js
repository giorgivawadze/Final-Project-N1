class Shipment {
  constructor(id, name, boxes, email) {
    this.id = id;
    this.name = name;
    this.boxes = boxes;
    this.email = email;
  }

}


async function fetchAllShipments() {
  const response = await fetch('https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json');
  const data = await response.json();
  return data.map(shipmentData => new Shipment(shipmentData.id, shipmentData.name, shipmentData.boxes, shipmentData.email));
}
function displayShipments(shipments) {
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


function calculateCargoBays(cargoBoxes) {
  const totalCargoBoxes = cargoBoxes.split(',').map(Number);
  return Math.ceil(totalCargoBoxes.reduce((acc, curr) => acc + curr, 0) / 10);
}

function onCargoBoxesInputChange(event) {
  const cargoBoxes = event.target.value;
  const cargoBays = calculateCargoBays(cargoBoxes);
  const cargoBaysSpan = document.querySelector('.spanofnumbercargo');
  cargoBaysSpan.textContent = `Number of required cargo bays: ${cargoBays}`;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllShipments()
    .then(displayShipments)
    .catch(error => console.error(error));

  const companyNameInput = document.querySelector('.group ul');
  companyNameInput.addEventListener('click', onCompanyNameInputChange);

  const cargoBoxesInput = document.querySelector('.cargobox');
  cargoBoxesInput.addEventListener('input', onCargoBoxesInputChange);
});


function onCompanyNameInputChange(event) {
  const query = (event.target.value || '').toString().toLowerCase();
  fetchAllShipments()
    .then(shipments => {
      const filteredShipments = shipments.filter(shipment => shipment.name.toLowerCase().includes(query));
      displayShipments(filteredShipments);
      
      if (filteredShipments.length > 0) {
        const selectedShipment = filteredShipments[0];
        const cargoBoxInput = document.querySelector('.cargobox');
        const cargoBaysSpan = document.querySelector('.spanofnumbercargo');
        
        cargoBoxInput.value = selectedShipment.boxes.join(',');
        cargoBaysSpan.textContent = `Number of required cargo bays: ${selectedShipment.cargo_bays}`;
      }
    })
    .catch(error => console.error(error));
}



document.addEventListener('DOMContentLoaded', () => {
  fetchAllShipments()
    .then(displayShipments)
    .catch(error => console.error(error));

  const companyNameInput = document.querySelector('#search');
  companyNameInput.addEventListener('input', onCompanyNameInputChange);

  const cargoBoxesInput = document.querySelector('.cargobox');
  cargoBoxesInput.addEventListener('input', onCargoBoxesInputChange);
});