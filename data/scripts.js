$(document).ready(function() {
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxkAOMKmWwjGjZZfh1LNhno6GTlXMtguyhKwyTAGXGbIfxxX8_oc7izHtWssb4A1scwxA/execs';

    fetch(webAppUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            data.forEach(row => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row['name']}</td>
                    <td>${row['email']}</td>
                    <td>${row['contact_number']}</td>
                    <td>${row['gender']}</td>
                    <td><a href='${row['media']}' target='_blank'>
                        Open Link
                    </a></td>
                    <td>${row['message']}</td>
                `;
                tableBody.appendChild(tr);
            });
            $('#dataTable').DataTable();
        })
        .catch(error => console.error('Error fetching data:', error));
});