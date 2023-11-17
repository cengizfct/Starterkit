export const createImage = (file) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
        reader.onload = (e) => {
            resolve({ uri: e.target.result, file })
        }
        reader.readAsDataURL(file)
    })
}

// set attribute background for slider background, If it doesnt use it, DOM will no-render on image in src of "img tag".
export const bgAttribute = (id, attribute = 'data-bg') => {
    const el = document.getElementById(id)
    const bg = el.getAttribute(attribute)
    el.style.backgroundImage = "url(" + bg + ")";
}

export const quality = async (image, width = 1920, quality = 1) => {
    const response = await createImage(image);
    const imgToCompress = new Image();
    imgToCompress.src = response.uri;
    return new Promise((mainResolve) => {
        setTimeout(async () => {
            let x = 1;
            if (imgToCompress.width > width) x = width / imgToCompress.width;
            // resizing the image
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            // imgToCompress
            const originalWidth = imgToCompress.width;
            const originalHeight = imgToCompress.height;

            const canvasWidth = originalWidth * x;
            const canvasHeight = originalHeight * x;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context.drawImage(
                imgToCompress,
                0,
                0,
                originalWidth * x,
                originalHeight * x
            );
            const flayer = new Image();
            // context.textAlign = 'center'
            flayer.src = "/images/flayer.png";
            // flayer.style = 'opacity: 0.4;filter:brightness(100)'
            context.drawImage(
                flayer,
                canvasWidth - canvasWidth / 4 - canvasWidth / 2, //canvasWidth / 2 - flayer.width / 2,
                canvasHeight - canvasHeight / 5 - canvasWidth / 2, //canvasWidth / 2 - flayer.width / 2,
                canvasWidth / 2,
                canvasWidth / 2
            );
            // reducing the quality of the image
            return new Promise(() => {
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            // showing the compressed image
                            // resizedImage.src =
                            const newFile = new File([blob], "image.png", {
                                type: "image/png",
                                lastModified: Date.now(),
                            });
                            mainResolve({
                                blob,
                                result: URL.createObjectURL(blob),
                                file: newFile,
                            });
                        }
                    },
                    "image/jpeg",
                    quality
                );
            });
        }, 150)
    })
}

