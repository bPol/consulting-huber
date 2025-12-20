(() => {
  const html = `
    <ul>
      <li>TODO: Led transformations across [X] countries.</li>
      <li>TODO: Improved KPI reporting cycle by [Y]%.</li>
      <li>TODO: Interim leadership for [Z]-stakeholder programs.</li>
    </ul>
  `;

  document.querySelectorAll('[data-proof-points]').forEach((el) => {
    el.innerHTML = html;
  });
})();
