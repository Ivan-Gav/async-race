import carSVG from '../assets/images/car-svg';

const getCarImage = (name:string, color:string):string => {
  let carImage = carSVG;
  carImage = carImage.replace('id="path2853" style="fill:#ffffff"', `id="path2853" style="fill:${color}"`);
  carImage = carImage.replace('<title id="title3968">Car - Top View</title>', `<title id="title3968">${name}</title>`);
  return carImage;
};

export default getCarImage;
