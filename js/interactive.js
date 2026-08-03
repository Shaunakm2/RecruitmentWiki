/* RecruitGPT Academy — interactive UI (no backend, no storage)
 * Everything here is in-memory only: state resets on page reload
 * by design, since there is no database. */
(function () {
  "use strict";

  function initAccordions() {
    var toggles = document.querySelectorAll(".accordion-toggle");
    toggles.forEach(function (btn, i) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;

      function setOpen(open) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
          panel.style.maxHeight = "0px";
        }
      }

      // First subtopic on each page starts open, the rest start closed.
      setOpen(i === 0);

      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });
    });

    // Recalculate open panels on resize so wrapped text doesn't clip.
    window.addEventListener("resize", function () {
      document.querySelectorAll('.accordion-toggle[aria-expanded="true"]').forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  }

  function initFlashcards() {
    document.querySelectorAll(".flashcard").forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", "false");

      function flip() {
        var flipped = card.classList.toggle("flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
      }

      card.addEventListener("click", flip);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
        }
      });
    });
  }

  function initQuizzes() {
    document.querySelectorAll(".quiz").forEach(function (quiz) {
      var options = quiz.querySelectorAll(".quiz-option");
      var feedback = quiz.querySelector(".quiz-feedback");
      var answered = false;

      options.forEach(function (opt) {
        opt.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          var correct = opt.getAttribute("data-correct") === "true";
          options.forEach(function (o) {
            o.disabled = true;
            if (o.getAttribute("data-correct") === "true") {
              o.classList.add("is-correct");
            } else if (o === opt) {
              o.classList.add("is-incorrect");
            }
          });

          if (feedback) {
            feedback.textContent = correct
              ? "Correct!"
              : "Not quite \u2014 the highlighted option is correct.";
            feedback.classList.add(correct ? "is-correct" : "is-incorrect");
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAccordions();
    initFlashcards();
    initQuizzes();
  });
})();
