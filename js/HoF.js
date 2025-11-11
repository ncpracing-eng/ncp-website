const SHEET_ID = "1ZweNs9pfLIpNidgOMhtSfazjgHvt1o084sFR-zmX8Pw";
const SHEET_NAME = "Fahrer";
const URL = `https://docs.google.com/spreadsheets/d/1ZweNs9pfLIpNidgOMhtSfazjgHvt1o084sFR-zmX8Pw/edit?usp=sharing`;

fetch(URL)
  .then(res => res.text())
  .then(txt => {
    const json = JSON.parse(txt.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const tbody = document.querySelector("#fahrerTable tbody");

    rows.forEach(r => {
      const [name, rolle, klasse, twitch] = r.c.map(c => c ? c.v : "");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${rolle}</td>
        <td>${klasse}</td>
        <td>${twitch ? `<a href="${twitch}" target="_blank">Twitch</a>` : ""}</td>
      `;
      tbody.appendChild(row);
    });
  });
