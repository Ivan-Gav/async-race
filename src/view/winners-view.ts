import createHtml from '../utils/create-html';
import winners from '../winners/winners';

const renderWinners = async (): Promise<DocumentFragment> => {
  const output = document.createDocumentFragment();

  const response = await winners.getWinners();

  let winnersList = `Total winners: ${response.total}<br>`;
  response.winners.forEach((winner) => {
    winnersList += `Winner №${winner.id}: wins-${winner.wins}, time-${winner.time}<br>`;
  });

  const winnersTable = createHtml('section', 'winners-table', undefined, winnersList);

  output.append(winnersTable);

  return output;
};

export default renderWinners;
