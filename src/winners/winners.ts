import Winner from './winner';

class Winners {
  private winnersURL = 'http://127.0.0.1:3000/winners';

  public async getWinners(
    page = 1,
    limit = 10,
  ): Promise<{ total: number; winners: Winner[] }> {
    const response = await fetch(
      `${this.winnersURL}?_page=${page}&_limit=${limit}`,
    );
    const winners = await response.json();
    const total = Number(response.headers.get('X-Total-Count'));
    return { total, winners };
  }

  public async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`${this.winnersURL}/${id}`);
    const result = await response.json();
    const winner = result as Winner;
    return winner;
  }

  public async createWinner(id: number, time: number, wins = 1): Promise<void> {
    const winner = {
      id,
      wins,
      time,
    };
    const response = await fetch(this.winnersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
    const addedWinner = await response.json();
    console.log(addedWinner);
  }

  public async deleteWinner(id: number): Promise<void> {
    try {
      await fetch(`${this.winnersURL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async updateWinner(id: number, time: number, wins: number): Promise<void> {
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
