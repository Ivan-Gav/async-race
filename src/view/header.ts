import '../styles/header.css';

const headerHtml = `
<input type="checkbox" id="menu-bar">
<label for="menu-bar">Menu</label>

<nav class="navbar">
  <ul>
    <li id="garage-menu-item"><span>Garage</span>
      <ul>
        <li class="menu-item_nested"><span>Create Car</span></li>
        <li class="menu-item_nested"><span>Generate Cars</span></li>
      </ul>
    </li>
    <li id="race-menu-item"><span>Race</span></li>
    <li id="winners-menu-item"><span>Hall of Fame</span></li>
  </ul>
</nav>
`;

const renderHeader = ():HTMLElement => {
  const header = document.createElement('header');
  header.innerHTML = headerHtml;
  return header;
};

export default renderHeader;
