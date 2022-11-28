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
  $("#name").css("display", "none");
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
    const name = $("#name").val();
    const data = {
      username,
      password,
    };
    const action = $("#action").val();
    if (action == "signup") data.name = name;
    const url =
      action == "login" ? "/api/v1/users/login" : "/api/v1/users/signup";
    const res = await axios({
      method: "POST",
      url,
      data,
    });

    if (res.data.status === "success") {
      if (action == "login") {
        showAlert("success", "Logged in successfully!");
      } else showAlert("success", "Sign up successfully!");
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
    $("#name").css("display", "block");
    $("#toSignUp").html("login here");
    $("#btn-action").html("Sign Up");
    $("#action").val("signup");
    $("#titleForm").html("Signup Form");
  } else {
    $("#name").css("display", "none");
    $("#toSignUp").html("Signup here");
    $("#btn-action").html("Login");
    $("#action").val("login");
    $("#titleForm").html("Login Form");
  }
});
