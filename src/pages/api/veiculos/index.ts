import faker from 'faker';
import fs from 'fs';

const getVehicleImage = async (vehicle) => {
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${vehicle}&format=json`);

    if (!response.ok) return 'https://placehold.it/300';

    const result = await response.json();

    return `https://api.duckduckgo.com${result.Image}`;
  } catch (error) {
    throw new Error(error);
  }
};

const generateVehicles = async () => {
  faker.locale = 'pt_BR';
  const vehicles = [];

  while (vehicles.length < 100) {
    const veiculo = faker.vehicle.vehicle();

    vehicles.push({
      imagem: getVehicleImage(encodeURI(veiculo)),
      veiculo,
      diaria: faker.commerce.price(20, 120),
      combustivel: faker.vehicle.fuel(),
      cor: faker.vehicle.color(),
      tipo: faker.vehicle.type(),
      vin: faker.vehicle.vin(),
      disponivel: faker.helpers.randomize([true, false]),
    });
  }

  fs.writeFile('veiculos.json', JSON.stringify(vehicles), 'utf8', () => { });

  return vehicles;
};

const handler = (_, response) => {
  response.send(generateVehicles());
};

export default handler;
