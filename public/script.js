document.getElementById('view-inventory-btn').addEventListener('click', function () {
    const locationId = document.getElementById('location-select').value;

    // Fetch inventory data
    fetch(`/inventory/${locationId}`)
        .then(response => response.json())
        .then(data => {
            const inventoryResultsDiv = document.getElementById('inventory-results');
            inventoryResultsDiv.innerHTML = ''; 

            if (data.length === 0) {
                inventoryResultsDiv.innerHTML = '<p>No inventory available for this location.</p>';
                return;
            }

            // Table for inv data
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
            `;
            table.appendChild(headerRow);

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.Name}</td>
                    <td>${item.Description}</td>
                    <td>${item.Quantity}</td>
                `;
                table.appendChild(row);
            });

            inventoryResultsDiv.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching inventory:', error);
        });
});