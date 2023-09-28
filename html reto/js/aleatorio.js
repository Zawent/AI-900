var currentImageIndex = 0;
var imageUrls = [
    "https://raw.githubusercontent.com/Zawent/AI-900/main/imagenes/picture1.jpg",
    "https://raw.githubusercontent.com/Zawent/AI-900/main/imagenes/picture16.jpg",
    "https://raw.githubusercontent.com/Zawent/AI-900/main/imagenes/picture10.jpg"
];

var imageElements = [
    document.getElementById("image1"),
    document.getElementById("image2"),
    document.getElementById("image3")
];

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    imageElements.forEach(function (imgElement, index) {
        imgElement.src = imageUrls[(currentImageIndex + index) % imageUrls.length];
    });
}

document.getElementById("changeImage").addEventListener("click", changeImage);

// Carga la primera imagen al cargar la página
changeImage();

$(document).ready(function () {
    $("#classifyButton").click(function () {
        var predictionUrl = "https://retoai-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fe25f955-12ed-4eeb-b136-d513eb1dbb86/classify/iterations/Iteration3/url";
        var predictionKey = "f2617404108641b28230adab8b5b1e6a";

        // Obtener las tres imágenes
        var img1 = $("#image1").attr("src");
        var img2 = $("#image2").attr("src");
        var img3 = $("#image3").attr("src");

        // Comprobar que las URL de las imágenes no están vacías
        if (img1 && img2 && img3) {
            // Continuar con el procesamiento de las imágenes aquí
            console.log("URL de la imagen 1:", img1);
            console.log("URL de la imagen 2:", img2);
            console.log("URL de la imagen 3:", img3);

            // Configurar los encabezados
            var headers = {
                "Prediction-Key": predictionKey,
                "Content-Type": "application/json"
            };

            // Realizar llamadas a la API de Custom Vision para cada imagen
            // Puedes usar img1, img2 y img3 en tus llamadas
            // A continuación, se muestra un ejemplo de cómo procesar una imagen
            var requestData1 = {
                url: img1
            };

            $.ajax({
                type: "POST",
                url: predictionUrl,
                headers: headers,
                data: JSON.stringify(requestData1),
                dataType: "json",
                success: function (data) {
                    var prediction = data;
                    var tagName = prediction.predictions[0].tagName;
                    $("#customVisionText1").val(tagName);
                    console.log("Tag de la imagen 1:", tagName);
                },
                error: function (error) {
                    alert("Error al procesar la imagen 1");
                    console.log("Error:", error);
                }
            });

            // Continúa de manera similar para las otras dos imágenes (img2 e img3)
        } else {
            console.log("Asegúrate de que las URL de las imágenes no estén vacías.");
        }

        // Para la imagen 2
        var requestData2 = {
            url: img2
        };

        $.ajax({
            type: "POST",
            url: predictionUrl,
            headers: headers,
            data: JSON.stringify(requestData2),
            dataType: "json",
            success: function (data) {
                var prediction = data;
                var tagName = prediction.predictions[0].tagName;
                $("#customVisionText2").val(tagName);
                console.log("Tag de la imagen 2:", tagName);
            },
            error: function (error) {
                alert("Error al procesar la imagen 2");
                console.log("Error:", error);
            }
        });

        // Para la imagen 3
        var requestData3 = {
            url: img3
        };

        $.ajax({
            type: "POST",
            url: predictionUrl,
            headers: headers,
            data: JSON.stringify(requestData3),
            dataType: "json",
            success: function (data) {
                var prediction = data;
                var tagName = prediction.predictions[0].tagName;
                $("#customVisionText3").val(tagName);
                console.log("Tag de la imagen 3:", tagName);
            },
            error: function (error) {
                alert("Error al procesar la imagen 3");
                console.log("Error:", error);
            }
        });

    });
});