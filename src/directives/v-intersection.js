export const vIntersection =  (el, binding) => {
  const options = {
    rootMargin: "0px",
    threshold: 0.9
  };
  const callback = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      binding.value();
    }
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el)
}
