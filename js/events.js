const SHEET_ID = "1ZweNs9pfLIpNidgOMhtSfazjgHvt1o084sFR-zmX8Pw";

function loadSheet(sheetName, tableId) {
  const url = `https://docs.google.com/spreadsheets/d/1ZweNs9pfLIpNidgOMhtSfazjgHvt1o084sFR-zmX8Pw/edit?usp=sharing`;

  fetch(url)
    .then(res => res.text())
    .then(txt => {
      const json = JSON.parse(txt.substr(47).slice(0, -2));
      const rows = json.table.rows;
      const tbody = document.querySelector(`#${tableId} tbody`);

      rows.forEach(r => {
        const cells = r.c.map(c => c ? c.v : "");
        const row = document.createElement("tr");
        row.innerHTML = `
          ${cells.slice(0, 5).map(v => `<td>${v}</td>`).join("")}
          <td>${cells[5] ? `<img src="${cells[5]}" height="25">` : ""}</td>
        `;
        tbody.appendChild(row);
      });
    });
}

loadSheet("Events_iRacing", "iracingTable");
loadSheet("Events_Other", "otherTable");
