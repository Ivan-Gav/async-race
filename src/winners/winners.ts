import Winner from './winner';

class Winners {
  private winnersURL = 'http://127.0.0.1:3000/winners';

  public async getWinners(
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'ASC',
  ): Promise<{ total: number; winners: Winner[] }> {
    const response = await fetch(
      `${this.winnersURL}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    );
    const winners = await response.json();
    const total = Number(response.headers.get('X-Total-Count'));
    return { total, winners };
  }

  public async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`${this.winnersURL}/${id}`);
    if (!response.ok) throw new Error(`Car id=${id} not found in the Winners list.`);
    const result = await response.json();
    const winner = result as Winner;
    return winner;
  }

  private async createWinner(id: number, time: number, wins = 1): Promise<void> {
    const winner = {
      id,
      wins,
      time,
    };
    await fetch(this.winnersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public async deleteWinner(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.winnersURL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Can't delete car with id=${id} from the Winners list.`);
    } catch (error) {
      console.log(error);
    }
  }

  private async updateWinner(id: number, time: number, wins: number): Promise<void> {
    const winner = {
      id,
      wins,
      time,
    };
    await fetch(`${this.winnersURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public async addWinner(id:number, time:number):Promise<void> {
    try {
      const winnerRecord = await this.getWinner(id);
      console.log(winnerRecord);
      let newTime = winnerRecord.time;
      if (time < winnerRecord.time) newTime = time;
      this.updateWinner(id, newTime, (winnerRecord.wins + 1));
    } catch (error) {
      this.createWinner(id, time);
    }
  }
}

const winners = new Winners();

export default winners;
