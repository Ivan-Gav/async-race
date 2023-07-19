import garage from './garage';

const carBrands = [
  { brand: 'Zapor', models: ['Legend', 'Elegance', 'Surprise', 'Expectation', 'Delight', 'Hope', 'Hope Turbo', 'Foretaste', 'Pressure', 'Rush'] },
  { brand: 'Oka', models: ['Korito', 'Taz Sport', 'Kanava Deluxe', 'Taz', 'Taz Racing', 'Taz Limited', 'Kanava', 'Koldobina', 'Nevezuha', 'Boltanka'] },
  { brand: 'Lada', models: ['Vedro', 'Vedro Sport', 'Vedro Classic', 'Beznadega', 'Urna', 'Urna Elite', 'Berloga', 'Net-ne-Nado', 'Grob Sport', 'Grob 4x4'] },
  { brand: 'Ëmobile', models: ['Discomfort', 'Accident', 'Fiasco New', 'Obstacle', 'Disaster', 'Catastroph', 'Calamity', 'Despair', 'Absurd', 'Delirium'] },
  { brand: 'DurAZ', models: ['Bidon 3', 'Kabluk', 'Nedolet', 'Neuspel', 'Buhanka', 'RidVan', 'RidVan 4x4', 'Netuda', 'Nepopal', 'Nedolet New', 'Proval'] },
  { brand: 'Taburet', models: ['Ulitka', 'Minus', 'Revolution', 'Crap', 'Sleeper', 'Snail', 'Minus 2', 'Rickety', 'Decrepit', 'Wreck'] },
  { brand: 'Zubilo', models: ['Bespredel', 'Oblom Turbo', 'Patzan 2.5', 'Patzan', 'Bratan', 'Bratan 3.0', 'Razborka', 'Razborka 2', 'Oblom Lux', 'GopStop', 'Discoteka'] },
  { brand: 'PPZ', models: ['Total', 'Complete', 'Absolute', 'Endless', 'Unbearable', 'Intolerable', 'Neverending', 'Inevitable', 'Imminent', 'Fatality'] },
  { brand: 'Trabant', models: ['Disorder', 'Flaw', 'Blunder', 'Disgrace', 'Failure', 'Collapse', 'Setback', 'Fail 8', 'Mishap', 'FckUp'] },
  { brand: 'Buhatti', models: ['Uron', 'GranStakan', 'GranFiasco', 'Boduni', 'GranAlco', 'EB', 'Nalivatti', 'Booze', 'GranBooze', 'Crettini'] },
  { brand: 'Lapsus', models: ['OGO 16', 'UGU 7', 'HZ', 'URoad', 'OGO 17', 'OGO 18', 'URoad SE', 'OBoom', 'OBoom SE', 'DuraCruze'] },
  { brand: 'Peugeopel', models: ['Glafira', 'Lustra', 'Karl', 'Zasada', 'Bibica', 'Drabadan', 'Vidra', 'Lustra SE', 'Zapara', 'Gustav'] },
  { brand: 'Oops-Oyce', models: ['Katafalc', 'Chemodan', 'Saray', 'Barge', 'Tormoz'] },
];

const generateCarColor = ():string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const generateCarName = ():string => {
  const i = Math.floor(Math.random() * carBrands.length);
  const j = Math.floor(Math.random() * carBrands[i].models.length);
  return `${carBrands[i].brand} ${carBrands[i].models[j]}`;
};

const generateCars = async (qty = 100):Promise<void> => {
  const set = new Set<string>();
  while (set.size < qty) {
    set.add(generateCarName());
  }
  console.log(set);
  const newCarsArr:Promise<void>[] = [];
  set.forEach(async (carName) => {
    const carColor = generateCarColor();
    newCarsArr.push(garage.createCar(carName, carColor));
  });
  await Promise.all(newCarsArr);
  window.location.reload();
};

export default generateCars;
