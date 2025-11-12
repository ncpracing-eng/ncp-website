const SHEET_ID = "1ZweNs9pfLIpNidgOMhtSfazjgHvt1o084sFR-zmX8Pw";

function loadSheet(sheetName, tableId) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  fetch(url)
    .then(res => res.text())
    .then(txt => {
      const json = JSON.parse(txt.substr(47).slice(0, -2));
      const rows = json.table.rows;
      const tbody = document.querySelector(`#${tableId} tbody`);
      tbody.innerHTML = ""; // vorherigen Inhalt leeren

      rows.forEach(r => {
        if (!r.c) return; // Überspringt leere Zeilen

        const cells = (r.c || []).map(c => c?.v ?? "");
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${cells[0]}</td>
          <td>${cells[1]}</td>
          <td>${cells[2]}</td>
          <td>${cells[3]}</td>
          <td>${cells[4]}</td>
          <td>${cells[5] ? `<img src="${cells[5]}" height="25" alt="Logo">` : ""}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Fehler beim Laden von", sheetName, err);
      const tbody = document.querySelector(`#${tableId} tbody`);
      tbody.innerHTML = `<tr><td colspan="6">⚠️ Daten konnten nicht geladen werden</td></tr>`;
    });
}

// iRacing & andere Simulationen laden
loadSheet("Events_iRacing", "iracingTable");
loadSheet("Events_Other", "otherTable");
