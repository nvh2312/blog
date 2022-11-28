$("#add").on("submit", async (e) => {
  e.preventDefault();
  tinyMCE.triggerSave();
  const form = new FormData();
  form.append("title", $("#title").val());
  form.append("category", $("#category").val());
  form.append("description", $("#description").val());
  form.append("image", $("#image")[0].files[0]);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/blogs",
      data: form,
    });
    if (res.data.status === "success") {
      showAlert("success", "Added Blog successfully!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
});
