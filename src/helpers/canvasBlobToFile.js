export function dataURItoBlob(canvas) {
  return new Promise((res) => {
    canvas.toBlob((blob) => {
      let file = new File([blob], "about-canvas-img.png", {
        type: "image/png",
      });
      res({file, blob});
    }, "image/png");
  });
}