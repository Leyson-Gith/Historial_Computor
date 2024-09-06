function registrarEquipo() {
    let equipo = {
        placa: document.getElementById('placa').value,
        tipo: document.getElementById('tipo').value,
        nombre: document.getElementById('nombre').value,
        serial: document.getElementById('serial').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ram: document.getElementById('ram').value,
        cpu: document.getElementById('cpu').value,
        almacenamiento: document.getElementById('almacenamiento').value,
        ubicacion: document.getElementById('ubicacion').value,
        sistema_operativo: document.getElementById('sistema_operativo').value,
        registros: []
    };

    fetch('/registrar_equipo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'Equipo registrado con éxito') {
            alert(data.status);
            window.location.reload();  // Recargar la página para ver el nuevo equipo en la tabla
        } else {
            alert('Error al registrar el equipo');
        }
    });
}

function buscar() {
    let query = document.getElementById('buscador').value;
    let filtro = document.getElementById('filtro').value;

    fetch(`/buscar?q=${query}&filtro=${filtro}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultados-info').innerText = `Resultados: ${data.total}`;
        let tbody = document.getElementById('tabla-equipos').querySelector('tbody');
        tbody.innerHTML = '';
        data.resultados.forEach(equipo => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${equipo.placa}</td>
                <td>${equipo.nombre}</td>
                <td>${equipo.marca}</td>
                <td>${equipo.modelo}</td>
                <td>${equipo.ram}</td>
                <td>${equipo.cpu}</td>
                <td>${equipo.almacenamiento}</td>
                <td>${equipo.ubicacion}</td>
                <td>${equipo.sistema_operativo}</td>
                <td>
                    <a href="/equipo/${equipo.placa}">Ver</a>
                    <button onclick="eliminarEquipo('${equipo.placa}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function eliminarEquipo(placa) {
    if (confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
        fetch(`/eliminar_equipo/${placa}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
            window.location.reload();  // Recargar la página para actualizar la tabla
        });
    }
}

