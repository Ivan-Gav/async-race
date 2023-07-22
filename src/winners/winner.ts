export default class Winner {
  public id;

  public wins;

  public time;

  constructor(id: number, wins: number, time: number) {
    this.id = id;
    this.wins = wins;
    this.time = time;
  }
}
