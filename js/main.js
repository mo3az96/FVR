$(window).on("load", function () {
  const theme = localStorage.getItem("custom_theme");
  if (theme) {
    document.documentElement.style.setProperty("--main-color", theme);
  }
  let main_color = getComputedStyle(document.documentElement)
    .getPropertyValue("--main-color")
    .trim();

  $("input[name='color']").each(function () {
    if ($(this).val() === main_color) {
      $(this).prop("checked", true);
    }
  });

  $(".preloader").fadeOut();
});

$(document).ready(function () {
  ////////////////////* theme *////////////////////

  let color_radio = $("input[name='color']");
  color_radio.change(function () {
    const color = $(this).val();
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("custom_theme", color);
  });

  // User Menu active links
  $(".user-menu .menu-anchor:not(.logout-btn)").click(function () {
    $(this).toggleClass("active").siblings(".sub-menu").slideToggle();
    $(".user-menu .menu-anchor")
      .not(this)
      .removeClass("active")
      .siblings(".sub-menu")
      .slideUp();
  });

  // User Menu in Mobile
  $(".user-nav-toggle").click(function (e) {
    $(this).parents(".user-nav").toggleClass("active");
  });

  // ************************************************************************************************
  // Change color of selected option in Select2 to black
  $(".myselect").on("change", function () {
    $(this)
      .siblings(".select2-container")
      .find(".select2-selection__rendered")
      .addClass("text-black");
  });

  // ************************************************************************************************

  // AddNewSession page file inputs
  const inputFile = $(".input-file");

  $(".add-file-btn").on("click", function (e) {
    e.preventDefault();
    $(this).siblings(".input-file").click();
  });

  inputFile.on("change", function () {
    if (this.files.length === 1) {
      const file = this.files;
      let fileNameText = file[0].name;
      let inputWidth = $(this).closest(".file-input-wrapper").width();
      if (inputWidth >= 400) {
        if (fileNameText.length > 36) {
          fileNameText = fileNameText.substring(0, 33) + "...";
        }
      } else {
        if (fileNameText.length > 26) {
          fileNameText = fileNameText.substring(0, 23) + "...";
        }
      }
      const fileName = $("<p>").addClass("file-name").text(fileNameText);
      $(this).closest(".file-input-wrapper").find(".file-name").remove();
      $(this).closest(".file-input-wrapper").append(fileName);
    }
  });

  // ************************************************************************************************

  // educationalContent Page FancyBox
  if ($("[data-fancybox='eduContent-images-gallery']").length) {
    Fancybox.bind('[data-fancybox="eduContent-images-gallery"]', {
      Carousel: {
        transition: "slide",
        infinite: false,
      },
    });
  }

  // ************************************************************************************************

  //  M O D A L S

  // Classes Modals
  $(".edit-class-btn").on("click", function () {
    $(".edit_class_modal").fadeIn();
  });
  $(".delete-class-btn").on("click", function () {
    $(".delete_class_modal").fadeIn();
  });
  $(".copy-class-btn").on("click", function () {
    $(".copy_class_modal").fadeIn();
  });

  // Class (points & attendance) History
  $(".view-attendance-btn").on("click", function () {
    $(".attendance_history_modal").fadeIn();
  });
  $(".view-points-btn").on("click", function () {
    $(".points_history_modal").fadeIn();
  });

  // Students Modals
  $(".add-student-btn").on("click", function () {
    $(".add_student_modal").fadeIn();
  });

  $(".edit-student-btn").on("click", function () {
    $(".edit_student_modal").fadeIn();
  });
  $(".delete-student-btn").on("click", function () {
    $(".delete_student_modal").fadeIn();
  });

  // Student List Modal
  $(".view-list-btn").on("click", function () {
    $(".student_list_modal").fadeIn();
  });

  // Sessions Modals

  //  Content Modals (new content & video-content & images-content)
  $(".add-eduContent-btn").on("click", function () {
    $(".add_eduContent_modal").fadeIn();
  });
  $(".video-eduContent-btn").on("click", function () {
    $(".video_eduContent_modal").fadeIn();
  });
  $(".images-eduContent-btn").on("click", function () {
    $(".images_eduContent_modal").fadeIn();
  });
  $(".document-eduContent-btn").on("click", function () {
    $(".document_eduContent_modal").fadeIn();
  });
  $(".audio-eduContent-btn").on("click", function () {
    $(".audio_eduContent_modal").fadeIn();
  });

  // Session Attendances & Absences

  $(".attendanceAbsence-page .student-card-btn").on("click", function () {
    $(".confirm_attendanceAbsence_modal").fadeIn();
  });

  $(".add-student-attendance-btn").on("click", function () {
    $(".add_student_attendance_modal").fadeIn();
  });

  // Add Points Modal

  $(".add-points-btn").on("click", function () {
    $(".add_points_modal").fadeIn();
    $("body").addClass("overflowHidden");
    $(".add_points_modal .modal_box").addClass("transition-box");
  });

  $(".add_points_modal .confirm-btn").on("click", function (e) {
    e.preventDefault();
    $(".add_points_modal").fadeOut();
    $(".add_points_success_modal").fadeIn();
    $(".add_points_success_modal .modal_box").addClass("transition-box");
  });

  // Deduct Points Modal
  $(".deduct-points-btn").on("click", function () {
    $(".deduct_points_modal").fadeIn();
    $("body").addClass("overflowHidden");
    $(".deduct_points_modal .modal_box").addClass("transition-box");
  });

  $(".deduct_points_modal .confirm-btn").on("click", function (e) {
    e.preventDefault();
    $(".deduct_points_modal").fadeOut();
    $(".deduct_points_success_modal").fadeIn();
    $(".deduct_points_success_modal .modal_box").addClass("transition-box");
  });

  // Common in (Add & Deduct) Points Modal
  $(
    ".add_points_success_modal .proceed-btn , .deduct_points_success_modal .proceed-btn "
  ).on("click", function () {
    $(".general_modal").fadeOut();
    $("body").removeClass("overflowHidden");
    $(".modal_box").removeClass("transition-box");
    $(".student-card-btn input").prop("checked", false);
    $(".group-card-btn input").prop("checked", false);
  });

  // Finish Session Modal

  $(".finish-session-btn").on("click", function () {
    $(".finish_session_modal").fadeIn();
  });

  // Create Groups Modal
  $(".add-groups-btn").on("click", function () {
    $(".create_groups_modal").fadeIn();
  });

  // Group increment and decrement counter
  $(".plus-icon").on("click", function () {
    let currentNumber = parseInt($(".students-number").text().trim(), 10);
    $(".students-number").text(currentNumber + 1);
  });

  $(".minus-icon").on("click", function () {
    let currentNumber = parseInt($(".students-number").text().trim(), 10);
    if (currentNumber !== 0) {
      $(".students-number").text(currentNumber - 1);
    }
  });

  // Challenge Modal

  $(".challenge-number-btn:has(input:not(:disabled))").on("click", function () {
    $(".challenge_modal").fadeIn();
  });

  $(
    ".challenge_modal , .challenge_modal .close_modal , .challenge_modal .proceed-btn"
  ).on("click", function () {
    $(".general_modal").fadeOut();
    $("body").removeClass("overflowHidden");
    $(".modal_box").removeClass("transition-box");
    $(".challenge-number-btn input").prop("checked", false);
  });

  // Ranks Modals
  $(".rank-rewards-btn").on("click", function () {
    $(".rank_rewards_modal").fadeIn();
  });
  $(".rank-history-btn").on("click", function () {
    $(".rank_history_modal").fadeIn();
  });

  $(".edit-rank-btn").on("click", function () {
    $(".edit_rank_modal").fadeIn();
    setTimeout(() => {
      $(".delete_rank_reward_modal .modal_box").removeClass("transition-box");
    }, 1);
  });

  $(".delete-rank-btn").on("click", function () {
    $(".delete_rank_modal").fadeIn();
  });

  // Delete Reward in rank
  $(".delete-rank-reward-btn").on("click", function (e) {
    e.preventDefault();
    $(".delete_rank_reward_modal").fadeIn();
  });

  // Delete AddingPointsReason Modal

  $(".delete-adding-reason-btn").on("click", function (e) {
    e.preventDefault();
    $(".delete_adding_reason_modal").fadeIn();
  });

  // Delete DeductingPointsReason Modal

  $(".delete-deducting-reason-btn").on("click", function (e) {
    e.preventDefault();
    $(".delete_deducting_reason_modal").fadeIn();
  });

  // Rewards Modal

  // Rewards History Modal
  $(".rewards-history-btn").on("click", function (e) {
    e.preventDefault();
    $(".rewards_history_modal").fadeIn();
  });

  // Delete Reward Modal
  $(".delete-reward-btn").on("click", function (e) {
    e.preventDefault();
    $(".delete_reward_modal").fadeIn();
  });

  // Challenges Modals

  // Delete Challenge Modal
  $(".delete-challenge-btn").on("click", function (e) {
    e.preventDefault();
    $(".delete_challenge_modal").fadeIn();
  });

  // Logout Modal
  $(".logout-btn").on("click", function (e) {
    e.preventDefault();
    $(".logout_modal").fadeIn();
  });

  // /////  ///   ///   /////   /////   ///   ////////   ///////   //////////   ////////   ///////
  //  Common in  M O D A L S
  $(".modal_btn").on("click", function () {
    $(".modal_box").addClass("transition-box");
    $("body").addClass("overflowHidden");
  });

  $(".modal_btns .outline-btn").on("click", function (e) {
    e.preventDefault();
  });

  $(".general_modal, .close_modal, .modal_btns .outline-btn").on(
    "click",
    function (e) {
      let modal = $(this).closest(".general_modal");
      let modalBox = modal.find(".modal_box");
      modal.fadeOut();
      if (modal.hasClass("delete_rank_reward_modal")) {
        modalBox.removeClass("transition-box");
      } else {
        $("body").removeClass("overflowHidden");
        $(".modal_box").removeClass("transition-box");
      }
    }
  );

  $(
    ".modal_box:not(.images_eduContent_modal .modal_box) , .images_eduContent_modal .modal_title"
  ).on("click", function (e) {
    e.stopPropagation();
  });

  // ************************************************************************************************

  //  Select2

  if ($(".myselect").length > 0) {
    $(".myselect").select2();
    $(".form select").select2({
      minimumResultsForSearch: -1,
    });
  }

  // ***********************************************************************************************
  // SWIPERS

  // Main Swiper
  if ($(".mainBanner .swiper").length) {
    const mainSwiper = new Swiper(".mainBanner .swiper", {
      loop: true,
      autoplay: {
        delay: 3000, // Proper autoplay format
        disableOnInteraction: false,
      },
      draggable: true,
      speed: 800,
      pagination: {
        el: ".mainBanner .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
    });
  }

  // Reviews Swiper

  if ($(".reviews .swiper").length) {
    const Reviewswiper = new Swiper(".reviews .swiper", {
      loop: true,
      autoplay: true,
      draggable: true,
      speed: 800,
      pagination: {
        el: ".reviews .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
    });
  }

  // ***********************************************************************************************
  // Faq

  $(".faq-item").on("click", function () {
    $(this).children(".faq-answer").slideToggle(300);
    $(this).toggleClass("active").siblings().removeClass("active");
    $(".faq-answer").not($(this).children(".faq-answer")).slideUp(300);
  });

  // ***********************************************************************************************

  $("input[type=tel]").each(function () {
    intlTelInput(this, {
      utilsScript: "utils.js",
      autoPlaceholder: "aggressive",
      separateDialCode: true,
      initialCountry: "sa",
      preferredCountries: ["sa", "kw", "ae", "bh", "om", "qa", "eg"],
    });
  });

  // ***********************************************************************************************

  let $timer = $(".timer");

  if ($timer.length) {
    let $stopTimerBtn = $(".stop-timer-btn");
    let $startTimerBtn = $(".start-timer-btn");
    let minutesLeft = 0;
    let minutesRight = 0;
    let secondsLeft = 0;
    let secondsRight = 0;
    let interval = null;

    // تحميل حالة التايمر
    function loadTimerState() {
      let storedTime = localStorage.getItem("timer-remaining");
      let startTimestamp = localStorage.getItem("timer-start-timestamp");
      let isPaused = localStorage.getItem("timer-paused") === "true";

      if (storedTime) {
        let totalSeconds = parseInt(storedTime);

        if (startTimestamp && !isPaused) {
          // إذا كان التايمر يعمل (غير متوقف)
          let elapsedTime = Math.floor(
            (Date.now() - parseInt(startTimestamp)) / 1000
          );
          let remainingSeconds = totalSeconds - elapsedTime;

          if (remainingSeconds > 0) {
            updateTimeFromSeconds(remainingSeconds);
            updateDisplay();
            startTimer(true); // استمر في التايمر
          } else {
            resetTimer();
          }
        } else if (isPaused) {
          // إذا كان التايمر متوقفًا، فقط اعرض الوقت المتبقي
          updateTimeFromSeconds(totalSeconds);
          updateDisplay();
        }
      }
    }

    // تحديث الوقت من الثواني
    function updateTimeFromSeconds(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      minutesLeft = Math.floor(minutes / 10);
      minutesRight = minutes % 10;
      secondsLeft = Math.floor(secs / 10);
      secondsRight = secs % 10;
    }

    // تحديث العرض
    function updateDisplay() {
      $("#minutesLeft").text(minutesLeft);
      $("#minutesRight").text(minutesRight);
      $("#secondsLeft").text(secondsLeft);
      $("#secondsRight").text(secondsRight);
    }

    // إعادة تهيئة التايمر
    function resetTimer() {
      localStorage.removeItem("timer-remaining");
      localStorage.removeItem("timer-start-timestamp");
      localStorage.removeItem("timer-paused");
      updateTimeFromSeconds(0);
      updateDisplay();
    }

    // التعامل مع أزرار التحكم
    function handleButtonClick() {
      let $button = $(this);
      let type = $button.closest(".time-control").attr("class");
      let direction = $button.hasClass("up") ? 1 : -1;

      if (type.includes("minutes-left")) {
        minutesLeft = Math.max(0, Math.min(5, minutesLeft + direction));
      } else if (type.includes("minutes-right")) {
        minutesRight = Math.max(0, Math.min(9, minutesRight + direction));
      } else if (type.includes("seconds-left")) {
        secondsLeft = Math.max(0, Math.min(5, secondsLeft + direction));
      } else if (type.includes("seconds-right")) {
        secondsRight = Math.max(0, Math.min(9, secondsRight + direction));
      }
      updateDisplay();
    }

    $(".time-control .arrow").on("click", handleButtonClick);

    // بدء التايمر
    function startTimer(isResuming = false) {
      let totalSeconds = isResuming
        ? (minutesLeft * 10 + minutesRight) * 60 +
          (secondsLeft * 10 + secondsRight)
        : (minutesLeft * 10 + minutesRight) * 60 +
          (secondsLeft * 10 + secondsRight);

      if (totalSeconds <= 0) return;

      if (!isResuming) {
        localStorage.setItem("timer-remaining", totalSeconds);
        localStorage.setItem("timer-start-timestamp", Date.now());
      }
      localStorage.setItem("timer-paused", "false");

      $(".countdown-parent .number, .countdown-parent .colon").addClass(
        "blue-color"
      );
      $(".time-control .arrow").addClass("d-none");
      $stopTimerBtn.css("display", "flex");
      $startTimerBtn.css("display", "none");

      interval = setInterval(() => {
        let startTimestamp = parseInt(
          localStorage.getItem("timer-start-timestamp")
        );
        let initialSeconds = parseInt(localStorage.getItem("timer-remaining"));
        let elapsedTime = Math.floor((Date.now() - startTimestamp) / 1000);
        let remainingSeconds = initialSeconds - elapsedTime;

        if (remainingSeconds <= 0) {
          clearInterval(interval);
          $(".countdown-parent .number, .countdown-parent .colon").removeClass(
            "blue-color"
          );
          $(".time-control .arrow").removeClass("d-none");
          $stopTimerBtn.css("display", "none");
          $startTimerBtn.css("display", "flex");
          resetTimer();
        } else {
          updateTimeFromSeconds(remainingSeconds);
          updateDisplay();
        }
      }, 1000);

      // تعديل زر الإيقاف
      $stopTimerBtn.off("click").on("click", function () {
        clearInterval(interval);
        $(".countdown-parent .number, .countdown-parent .colon").removeClass(
          "blue-color"
        );
        $(".time-control .arrow").removeClass("d-none");
        $stopTimerBtn.css("display", "none");
        $startTimerBtn.css("display", "flex");

        // احسب الوقت المتبقي وحفظه في localStorage
        let startTimestamp = parseInt(
          localStorage.getItem("timer-start-timestamp")
        );
        let initialSeconds = parseInt(localStorage.getItem("timer-remaining"));
        let elapsedTime = Math.floor((Date.now() - startTimestamp) / 1000);
        let remainingSeconds = initialSeconds - elapsedTime;

        localStorage.setItem("timer-remaining", remainingSeconds);
        localStorage.setItem("timer-paused", "true"); // علامة أن التايمر متوقف
        localStorage.removeItem("timer-start-timestamp"); // لا حاجة لطابع الزمن عند الإيقاف
      });
    }

    $startTimerBtn.on("click", () => startTimer(false));
    loadTimerState();
  }

  // ***********************************************************************************************

  // Groups Radio checked
  $(".student-cards .student-card").on("click", function (e) {
    e.stopPropagation();
    $(".group-card-btn > input[type='radio']").prop("checked", false);
  });
  $(".group-card-btn").on("click", function (e) {
    e.stopPropagation();
    $(".student-cards .student-card > input[type='radio']").prop(
      "checked",
      false
    );
  });

  // ***********************************************************************************************

  // Wheel in studentsWheel page

  // Style Circle Wrapper

  const items = document.querySelectorAll(".circle-wrapper .item");
  const itemsCount = items.length;
  const segment = 360 / itemsCount;

  const colors = [
    "white",
    "#ff4722",
    "#219fff",
    "#feb822",
    "#ff5356",
    "white",
    "#5bca5b",
    "white",
    "#d9ed00",
    "#a7a7a8",
    "#ff4242",
    "#ffb521",
    "#53bd53",
    "#21d6ff",
    "#ffff21",
    "#2190ff",
  ];
  let stops = [];

  for (let i = 0; i < itemsCount; i++) {
    const start = i * segment;
    const end = (i + 1) * segment;
    const color = colors[i % colors.length];
    stops.push(`${color} ${start}deg ${end}deg`);
  }

  const gradientStops = stops.join(", ");

  if (document.querySelector(".circle-wrapper")) {
    document.querySelector(
      ".circle-wrapper"
    ).style.background = `conic-gradient(from 0deg, ${gradientStops})`;
  }

  // ***************************

  // WHEEL

  let studentsInWheel = Array.from(
    document.querySelectorAll(".wheel-parent .item")
  );
  let itemCount = studentsInWheel.length;
  let angleStep = 360 / itemCount;

  studentsInWheel.forEach((item, index) => {
    item.style.transform = `rotate(${angleStep * index + angleStep / 2}deg)`;
  });

  const wheel = document.querySelector(".wheel-parent .circle-wrapper");
  const spinButton = document.querySelector(".wheel-parent .rotate-btn");

  let currentAngle = 0;

  if (spinButton) {
    spinButton.addEventListener("click", () => {
      const randomAngle = Math.random() * 360;
      const numRotations = 5 + Math.floor(Math.random() * 6);
      const additionalRotation = numRotations * 360 + randomAngle;
      currentAngle += additionalRotation;
      wheel.style.transform = `translateX(-50%) rotate(${currentAngle}deg)`;
      spinButton.disabled = true;
      setTimeout(() => {
        const effectiveAngle = (360 - (currentAngle % 360)) % 360;
        let index = Math.floor(effectiveAngle / angleStep);
        const selectedElement = studentsInWheel[index];
        const selectedName = selectedElement.textContent.trim();
        let selectedId = selectedElement.getAttribute("data-id");
        console.log("Selected ID:", selectedId);
        console.log("Selected Name:", selectedName);
        spinButton.disabled = false;
      }, 5000);
    });
  }

  // ***********************************************************************************************

  // Mobile Main Menu

  $(".bars").click(function () {
    $(".navigation").addClass("show-navigation");
    $("body").addClass("overflowHidden");
  });

  $(".close-btn").click(function () {
    $(".navigation").removeClass("show-navigation");
    $("body").removeClass("overflowHidden");
  });

  // ***********************************************************************************************
  // show password when click icon
  $(".pass-input-wrapper .icon").click(function () {
    $(this).toggleClass("fa-eye-slash").toggleClass("fa-eye");
    let input = $(this).siblings(".input");
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
  // ***********************************************************************************************

  // Fixed Header

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });

  // ***********************************************************************************************

  //  Footer Collapse in Mobile

  if ($(window).width() < 768) {
    $(".footer-title").on("click", function () {
      $(this).next(".collapse-ul").slideToggle(300);
      $(this).toggleClass("arrow-rotate");
      $(".footer-title").not($(this)).next(".collapse-ul").slideUp(300);
      $(".footer-title").not($(this)).removeClass("arrow-rotate");
    });
  }
  // ***********************************************************************************************
}); // End Document Ready
