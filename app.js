const y = new Date().getFullYear();

(function cargarTable() {

  $.ajax({
    type: "POST",
    url: "https://apis.digital.gob.cl/fl/feriados/" + y,
    dataType: 'jsonp',
    contentType: false,
    async: false,
    success: function (respuesta) {

      let resuelto = JSON.parse(JSON.stringify(respuesta));

      let htmlTodo = `
          <table id="dataTables-feriados" class="table table-striped table-bordered table-hover" data-page-length="10">
            <thead>
              <tr>
                <th class="text-center">Fecha</th>
                <th class="text-center">Titulo</th>
                <th class="text-center">Tipo</th>
              </tr>
            </thead>
          <tbody>`;

      for (let i = 0; i < resuelto.length; i++) {

        htmlTodo += `
            <tr>
              <td class="text-nowrap bd-highlight" style="width: 8rem;">${resuelto[i].fecha.split('-').reverse().join('-')}</td>
              <td class="text-nowrap bd-highlight" style="width: 8rem;">${resuelto[i].nombre}</td>
              <td class="text-nowrap bd-highlight" style="width: 8rem;">${resuelto[i].tipo}</td>
            </tr>`;
      }

      htmlTodo += `
            </tbody>
            </table>`;

      $(".table-feriados").html(htmlTodo);
      RearmTableEM("dataTables-feriados");
    },
  });
})();

function RearmTableEM(tabla) {

  $('#' + tabla).dataTable({
    paging: true,
    lengthChange: true,
    bFilter: true,
    searching: true,
    ordering: true,
    info: true,
    bInfo: true,
    autoWidth: false,
    responsive: true,
    order: [1, "Desc"],
  });
};
