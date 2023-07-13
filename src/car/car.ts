// export type Car = {
//   id?: number;
//   name: string;
//   color: string;
// };

export default class Car {
  public id;

  public name;

  public color;

  constructor(id: number, name: string, color: string) {
    this.name = name;
    this.color = color;
    this.id = id;
  }
}
