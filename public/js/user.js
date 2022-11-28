const err_src = "/images/unnamed.jpg";
const loadData = async () => {
  try {
    $("#sample_data").DataTable({
      processing: true,
      serverSide: true,
      serverMethod: "get",
      ajax: {
        url: "api/v1/users/table",
      },
      columns: [
        {
          data: "avatar",
          render: function (data) {
            return (
              `<img src="` +
              data +
              `" alt=""height="65" width="65" onerror="this.src='` +
              err_src +
              `';" style="border-radius: 0.275rem;" >`
            );
          },
        },
        {
          data: "name",
          render: function (data) {
            return '<div class= "my-3">' + data + "</div>";
          },
        },

        {
          data: "username",
          render: function (data) {
            return '<div class= "my-3">' + data + "</div>";
          },
        },
        {
          data: null,
          render: function (row) {
            let btnDelete =
              '<button type="button" class="btn btn-danger btn-sm delete" data-id="' +
              row._id +
              '"><i class="fa fa-trash-alt"></i></button></div>';
            return `<div class= "my-3">${btnDelete}</div>`;
          },
        },
      ],
    });

    showAlert("success", "Load Data successfully!");
  } catch (err) {
    showAlert("error", err);
  }
};
function reloadData() {
  $("#sample_data").DataTable().ajax.reload();
}
$(document).ready(async function () {
  loadData();
});

$(document).on("click", ".delete", function () {
    const id = $(this).data("id");
  
    if (confirm("Are you sure you want to delete this data?")) {
        console.log(id)
      try {
        $.ajax({
          url: `/api/v1/users/${id}`,
          method: "delete",
          success: function (data) {
            showAlert("success", `Delete User ${id} Successfully`);
            reloadData();
          },
        });
      } catch (error) {
        return showAlert("error", error.responseJSON.message);
      }
    }
  });