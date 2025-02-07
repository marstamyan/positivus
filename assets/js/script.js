;(function () {
  const headerNav = document.querySelector(".header-nav")
  const burgerCheckbox = document.querySelector("#burger-checkbox")
  const burgerBtn = document.querySelector("#menu-btn")
  const menuLinks = document.querySelectorAll(".menu-nav__list-link")

  if (headerNav) {
    burgerBtn.addEventListener("click", (e) => {
      headerNav.classList.toggle("menu-active")
    })
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerNav.classList.remove("menu-active")
      burgerCheckbox.checked = false
    })
  })

  // faq
  document.querySelectorAll(".qna__item").forEach((item) => {
    const minimizeSiblings = true
    const question = item.querySelector(".qna__question")
    const answer = item.querySelector(".qna__answer")
    const cssDuration = getComputedStyle(answer).getPropertyValue(
      "--qna-animation-duration",
    )
    const animationDuration = Number.parseInt(
      Number.parseFloat(cssDuration) * (/\ds$/.test(cssDuration) ? 1000 : 1),
    )

    const setHeight = () =>
      answer.style.setProperty(
        "--qna-details-height",
        `${answer.scrollHeight}px`,
      )

    item.classList.add("js-details")

    const onClick = (event) => {
      setHeight()

      let isAnimating = true

      item.classList.toggle("is-open")
      item.classList.add("is-animating")

      setTimeout(() => {
        item.classList.remove("is-animating")
      }, animationDuration)

      if (!minimizeSiblings) return

      const siblings = [...item.parentNode.children]
        .filter((el) => el.classList.contains("js-details"))
        .filter((el) => el !== event.target.parentNode)

      for (const el of siblings) {
        el.classList.remove("is-open")
        setTimeout(() => {
          el.classList.remove("is-animating")
        }, animationDuration)
      }
    }

    question.addEventListener("click", onClick)

    //numeration
    const questions = document.querySelectorAll(".qna__question")

    questions.forEach((question, index) => {
      if (!question.dataset.numbered) {
        const number = String(index + 1).padStart(2, "0")
        const text = question.textContent.trim()
        const span = document.createElement("span")
        span.classList.add("qna__number")
        span.textContent = `${number} `
        question.innerHTML = ""
        question.appendChild(span)
        question.appendChild(document.createTextNode(text))

        question.dataset.numbered = "true"
      }
    })
  })

  //splider slider
  new Splide(".splide", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    focus: "center",
    gap: "30px",
    breakpoints: {
      768: { perPage: 2 },
      576: {
        perPage: 1,
        autoWidth: true,
        focus: 0,
        omitEnd: true,
      },
    },
    classes: {
      arrows: "splide__arrows review__actions",
      arrow: "splide__arrow slider-arrow",
      prev: "splide__arrow--prev arrow-left",
      next: "splide__arrow--next arrow-right",
      pagination: "slider-pagination",
      page: "pagination-bullet",
    },
  }).mount()

  // insert pagination between buttons
  const actionsContainer = document.querySelector(".review__actions")
  const pagination = document.querySelector(".slider-pagination")

  if (actionsContainer && pagination) {
    actionsContainer.insertBefore(pagination, actionsContainer.children[1])
  }
})()
