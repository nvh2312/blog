let login = $(".login-form");
let navbar = $(".header .navbar");

$("#logout").on("click", async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged out successfully!");
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
});

$("#login-btn").on("click", () => {
  $("#toSignUp").html("Signup here");
  $("#btn-action").html("Login");
  $("#action").val("login");
  $("#titleForm").html("Login Form");
  login.toggleClass("active");
  navbar.removeClass("active");
});


$("#btn-action").on("click", async () => {
  try {
    const username = $("#username").val();
    const password = $("#password").val();
    // const action = $("#action").val();
    // const url = action =="login" ? "/api/v1/users/login":"/api/v1/users/signup"
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        username,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
});
$("#search-addon").on("click", async () => {
  const data = $("#searchStr").val();
  if (data != "") {
    window.setTimeout(() => {
      location.assign(`/search/${data}`);
    }, 500);
  }
});
$("#toSignUp").on("click", (e) => {
  e.preventDefault();
  if ($("#action").val() == "login") {
    $("#toSignUp").html("login here");
    $("#btn-action").html("Sign Up");
    $("#action").val("signup");
    $("#titleForm").html("Signup Form");
  } else {
    $("#toSignUp").html("Signup here");
    $("#btn-action").html("Login");
    $("#action").val("login");
    $("#titleForm").html("Login Form");
  }
});
