//otp code animation

let otp_fields = $(".otp-form .otp-field"),
  otp_value_field = $(".otp-value");
otp_fields
  .on("input", function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
    let opt_value = "";
    otp_fields.each(function () {
      let field_value = $(this).val();
      if (field_value != "") {
        opt_value += field_value;
      }
    });
    otp_value_field.val(opt_value);
    if (otp_value_field.val().length == 4) {
      $("#step_2 .first-btn").removeAttr("disabled");
      $(".code-verification-form .general-btn").removeClass("disabled");
    } else {
      $("#step_2 .first-btn").attr("disabled", "disabled");
      $(".code-verification-form .general-btn").addClass("disabled");
    }
  })
  .on("keyup", function (e) {
    let key = e.keyCode || e.charCode;
    if (key == 8 || key == 46 || key == 37 || key == 40) {
      // Backspace or Delete or Left Arrow or Down Arrow
      $(this).prev().focus();
      $(this).attr("disabled", "disabled");
      $(".otp-field:first").removeAttr("disabled");
    } else if (key == 38 || key == 39 || $(this).val() != "") {
      // Right Arrow or Top Arrow or Value not empty
      $(this).next().removeAttr("disabled");
      $(this).next().focus();
    }
  })
  .on("paste", function (e) {
    let paste_data = e.originalEvent.clipboardData.getData("text");
    let paste_data_splitted = paste_data.split("");
    $.each(paste_data_splitted, function (index, value) {
      otp_fields.eq(index).val(value);
    });
  });

// Timer Function
$(".first-btn").on("click", function () {
  $(".otp-field:first").focus();
  timerFunc();
  if ($("#step_2").is(":visible")) {
    $(".register-sec .form-text").show();
  }
  if ($("#step_3").is(":visible")) {
    $(".header").addClass("success-header");
    $(".form-title-text").hide();
    $("body").addClass("success-header-body");
  }
});

//form wizard
function activeStep(ele, stepId) {
  var nextStep = "#step_" + stepId;
  $(".step").not(nextStep).hide();
  $(nextStep).show();
  var activeLi = "#activeStep-" + stepId;
  $(activeLi).addClass("active");
  if (stepId == 3) {
    // var activeHead = stepId - 1;
    var lastHead = stepId;
    // var activeStep = "#activeStep-" + activeHead;
    var activelast = "#activeStep-" + lastHead;
    $(activelast).addClass("active");
  } else {
    // var activeHead = stepId - 1;
    // var activeStep = "#activeStep-" + activeHead;
    // $(activeStep).addClass("active");
  }
}

// Verifiacation code timer page

function timerFunc() {
  const classExists =
    document.getElementsByClassName("countDown-content").length > 0;
  if (classExists) {
    function countdown() {
      var seconds = 120;
      function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        var minutes = Math.floor(seconds / 60);
        var secs = seconds % 60;
        counter.innerHTML = "0" + minutes + ":" + (secs < 10 ? "0" : "") + secs;
        if (seconds > 0) {
          setTimeout(tick, 1000);
        }
      }
      tick();
    }
    countdown();
  }
}

const codeVerificationForm = document.querySelector(".code-verification-form");
if (codeVerificationForm) {
  $(".otp-field:first").focus();
  timerFunc();
}
