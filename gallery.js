for (const trigger of document.querySelectorAll("[data-gallery]")) {
  const dialog = document.getElementById(trigger.dataset.gallery);
  const slides = Array.from(dialog.querySelectorAll("[data-shot]"));
  const counter = dialog.querySelector("[data-count]");
  let index = 0;

  function showSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    const slide = slides[index];

    if (!slide.hasAttribute("src")) {
      slide.src = slide.dataset.shot;
    }

    slides.forEach((image) => { image.hidden = image !== slide; });
    counter.textContent = `${index + 1} / ${slides.length}`;
  }

  trigger.addEventListener("click", () => {
    showSlide(0);
    dialog.showModal();
  });

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-prev]").addEventListener("click", () => showSlide(index - 1));
  dialog.querySelector("[data-next]").addEventListener("click", () => showSlide(index + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const { left, right, top, bottom } = dialog.getBoundingClientRect();
      if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
        dialog.close();
      }
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(index - 1);
    if (event.key === "ArrowRight") showSlide(index + 1);
  });

  dialog.addEventListener("close", () => trigger.focus({ preventScroll: true }));
}
