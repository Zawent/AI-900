$(document).ready(function () {
    // Clave de suscripción de Azure para Face
    var subscriptionKey = "42f7aad2d6224df3a05b0410dd8bd2e9";
    var endpoint = "https://reconocimiento-face.cognitiveservices.azure.com/";

    // Clave de suscripción de Custom Vision
    var predictionKey = "bfb0211fc36c4369ba263588b85b21cf";
    var predictionEndpoint = "https://detectorobj-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/f39decd4-1984-4f9b-b746-b0cb86e11e5a/detect/iterations/obj/url";

    // Función para analizar la imagen y detectar objetos
    function analizarImagen() {
        // Obtiene el valor del input
        var imageUrl = document.getElementById("link").value;
        console.log(imageUrl);

        // Verificar si la URL está vacía
        if (imageUrl.trim() === "") {
            console.log("Por favor, ingresa una URL de imagen válida.");
            return;
        }

        // Realizar la detección de objetos con Custom Vision
        var customVisionHeaders = {
            "Prediction-Key": predictionKey,
            "Content-Type": "application/json"
        };

        var customVisionRequestBody = {
            url: imageUrl
        };

        var imagenCargar = document.getElementById("vistaP");
        imagenCargar.src = imageUrl;

        console.log("Analyzing image...\n");

        $.ajax({
            type: "POST",
            url: predictionEndpoint,
            headers: customVisionHeaders,
            data: JSON.stringify(customVisionRequestBody),
            success: function (result) {
                console.log("Result from Custom Vision (Object Detection):\n", result);
            
                // Extraer solo los tags de las predicciones
                var tags = result.predictions.map(function (prediction) {
                    return prediction.tagName;
                });
            
                console.log("Tags:", tags);

                // Ahora, realizar la detección de caras con Azure Face API
                var headers = {
                    "Ocp-Apim-Subscription-Key": subscriptionKey,
                    "Content-Type": "application/json"
                };

                var requestBody = {
                    url: imageUrl
                };
        

                console.log("Analyzing faces...\n");

                $.ajax({
                    type: "POST",
                    url: endpoint + "face/v1.0/detect?detectionModel=detection_01",
                    headers: headers,
                    data: JSON.stringify(requestBody),
                    success: function (result) {
                        console.log("From June 21st 2022, Face service capabilities that return personally identifiable features are restricted.");
                        console.log("See https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/ for details.");
                        console.log("This code is restricted to returning the location of any faces detected:\n");

                        // Iterar a través de los resultados de detección de caras
                        $.each(result, function (index, face) {
                            console.log("Face location: " + JSON.stringify(face.faceRectangle) + "\n");
                        });
                    },
                    error: function (error) {
                        console.error("Error:", error);
                    }
                });
            },
            error: function (error) {
                console.error("Error in Custom Vision:", error);
            }
        });
    }

    // Asignar la función al evento clic del botón "Analizar"
    $("#analyzeButton").click(analizarImagen);
});