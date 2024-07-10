document.addEventListener("DOMContentLoaded", function() {
    // Creating image objects
    var images = [
        {src: "images/flowers-purple-small.jpg", alt: "Powerful purple flowers", width: 240, height: 160},
        {src: "images/flowers-red-small.jpg", alt: "Radiant red flowers", width: 240, height: 160},
        {src: "images/flowers-white-small.jpg", alt: "Wonderful white flowers", width: 240, height: 160},
        {src: "images/flowers-yellow-small.jpg", alt: "Youthful yellow flowers", width: 240, height: 160},
        {src: "images/flowers-pink-small.jpg", alt: "Passionate pink flowers", width: 240, height: 160},
    ];

    // Creating ul element
    var gallery = document.getElementById("gallery");
    var ul = document.createElement("ul");

    // Loop through the images array and create <li> elements with <img> tags
    images.forEach(function(image) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.width = image.width;
        img.height = image.height;

        // Set all images to grayscale
        img.style.filter = "grayscale(1)";
        // Remove grayscale for the default selected image
        if (image.src.includes("flowers-pink-small")) {
            img.style.filter = "grayscale(0)";
        }

        li.appendChild(img);
        ul.appendChild(li);

        // Add a click event listener to each thumbnail image
        img.addEventListener("click", function() {
            // Update the main image and caption
            var mainImage = gallery.querySelector("figure img");
            var caption = gallery.querySelector("figure figcaption");

            mainImage.src = image.src.replace("-small", "-large");
            mainImage.alt = image.alt;
            mainImage.width = image.width * 5;
            mainImage.height = image.height * 5;

            // Clear existing caption text
            caption.textContent = "";
            // Start typewriter effect for the new caption
            TypeWrite(caption, image.alt, 0);

            // Set grayscale for all thumbnail images to 1
            gallery.querySelectorAll("ul img").forEach(function(otherImg) {
                otherImg.style.filter = "grayscale(1)";
            });

            // Set grayscale for the clicked image to 0
            img.style.filter = "grayscale(0)";
        });
    });

    // Append the ul element
    gallery.appendChild(ul);

    // Typewriter effect function
    function TypeWrite(sentence, word, index) {
        if(index === word.length) {
            return;
        }
        sentence.textContent += word[index];
        setTimeout(TypeWrite, 20, sentence, word, index + 1);
    }

    // Initial call to TypeWrite for the first image caption
    var firstCaption = document.querySelector("#gallery figure figcaption");
    var firstWord = firstCaption.textContent;
    firstCaption.textContent = "";  // Clear existing text
    setTimeout(TypeWrite, 250, firstCaption, firstWord, 0);

    // Function to handle opacity slider changes
    function handleOpacityChange() {
        var opacitySlider = document.getElementById("opacity");
        var opacityValueDisplay = document.getElementById("opacityValue");
        var mainImage = gallery.querySelector("figure img");

        // Remove existing event listener if exists
        opacitySlider.removeEventListener("input", opacitySlider.oninput);

        // Set initial span value to match the slider value
        opacityValueDisplay.textContent = opacitySlider.value;

        opacitySlider.addEventListener("input", opacitySlider.oninput = function() {
            var value = opacitySlider.value;
            opacityValueDisplay.textContent = value;
            mainImage.style.opacity = value;
        });
    }

    // Function to handle contrast slider changes
    function handleContrastChange() {
        var contrastSlider = document.getElementById("contrast");
        var contrastValueDisplay = document.getElementById("contrastValue");
        var mainImage = gallery.querySelector("figure img");

        // Remove existing event listener if exists
        contrastSlider.removeEventListener("input", contrastSlider.oninput);

        // Set initial span value to match the slider value
        contrastValueDisplay.textContent = contrastSlider.value;

        contrastSlider.addEventListener("input", contrastSlider.oninput = function() {
            var value = contrastSlider.value;
            contrastValueDisplay.textContent = value;
            mainImage.style.filter = `contrast(${value})`;
        });
    }

    // Function to handle brightness slider changes
    function handleBrightnessChange() {
        var brightnessSlider = document.getElementById("brightness");
        var brightnessValueDisplay = document.getElementById("brightnessValue");
        var mainImage = gallery.querySelector("figure img");

        // Remove existing event listener if exists
        brightnessSlider.removeEventListener("input", brightnessSlider.oninput);

        // Set initial span value to match the slider value
        brightnessValueDisplay.textContent = brightnessSlider.value;

        brightnessSlider.addEventListener("input", brightnessSlider.oninput = function() {
            var value = brightnessSlider.value;
            brightnessValueDisplay.textContent = value;
            mainImage.style.filter = `brightness(${value})`;
        });
    }

    // Set up sliders
    handleOpacityChange();
    handleContrastChange();
    handleBrightnessChange();
});
