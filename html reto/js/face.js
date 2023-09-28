$(document).ready(function () {
    // Clave de suscripción de Azure para Face
    var subscriptionKey = "42f7aad2d6224df3a05b0410dd8bd2e9";
    var endpoint = "https://reconocimiento-face.cognitiveservices.azure.com/";

    // URL de la imagen inicial (puedes cambiarla si lo deseas)
    var imageUrl = "";

    // Encabezados de la solicitud HTTP
    var headers = {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
    };

    // Función para analizar la imagen
    function analizarImagen() {
        // Obtiene el valor del input
        imageUrl = document.getElementById("link2").value;
        console.log(imageUrl)

        // Verificar si la URL está vacía
        if (imageUrl.trim() === "") {
            console.log("Por favor, ingresa una URL de imagen válida.");
            return;
        }

        var imagenPrevia = document.getElementById("previo2");
        imagenPrevia.src = imageUrl;


        console.log("Analyzing image...\n");

        // Cuerpo de la solicitud JSON
        var requestBody = {
            url: imageUrl
        };


        setTimeout(function () {
            var medidaWidth = previo2.width;
            var medidaHeight = previo2.height;

            var divDeImg = document.getElementById("cuadrados-faces")
            divDeImg.style.width = medidaWidth;
            divDeImg.style.height = medidaHeight;
            divDeImg.style.maxHeight = 20 + "vw";
        })

        // Realizar la solicitud para detectar caras en la imagen
        $.ajax({
            type: "POST",
            url: endpoint + "face/v1.0/detect?detectionModel=detection_01",
            headers: headers,
            data: JSON.stringify(requestBody),
            success: function (result) {
                console.log("From June 21st 2022, Face service capabilities that return personally identifiable features are restricted.");
                console.log("See https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/ for details.");
                console.log("This code is restricted to returning the location of any faces detected:\n");

                $.each(result, function (index, face) {
                    console.log("Face location: " + JSON.stringify(face.faceRectangle) + "\n");

                    var faceDiv = document.createElement("div");
                    faceDiv.style.position = "absolute";
                    faceDiv.style.top = 0 + "px";
                    faceDiv.style.left = 0 + "px";
                    faceDiv.style.width = face.faceRectangle.width + "px";
                    faceDiv.style.height = face.faceRectangle.height + "px";
                    faceDiv.classList.add("square");

                    var cuadro = document.getElementById("cuadrados-faces");
                    cuadro.appendChild(faceDiv);

                    setTimeout(function () {
                        var cuadroChiqui = document.createElement("div");
                        cuadroChiqui.classList.add("cuadritoChiqui");
                        cuadroChiqui.style.position = "absolute";
                        cuadroChiqui.style.top = face.faceRectangle.top + "px";
                        cuadroChiqui.style.left = face.faceRectangle.left + "px";
                        cuadroChiqui.style.width = face.faceRectangle.width + "px";
                        cuadroChiqui.style.height = face.faceRectangle.height + "px";
                        cuadroChiqui.style.border = "2px solid red";

                        faceDiv.appendChild(cuadroChiqui);

                    }, 2000); // Retraso de 2 segundos
                });
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });

    }

    // Asignar la función al evento clic del botón "Analizar"
    $("#analyzeButton").click(analizarImagen);







    var tagName;
    //Inicio de la carga de imagenes a un repositorio generico donde recibe los archivos que el usuario carga en local
    document.getElementById('uploadButton2').addEventListener('click', async () => {
        const imageInput = document.getElementById('imageInput2');
        const imageFile = imageInput.files[0];
        console.log(imageInput);
        if (!imageFile) {
            alert('Selecciona una imagen antes de subirla.');
            return;
        }

        const token = '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';
        const username = 'Zawent';
        const repoName = 'AI-900';
        const branchName = 'main';

        const apiUrl = `https://api.github.com/repos/Zawent/AI-900/contents/moreImgs/${imageFile.name}`;

        const reader = new FileReader();

        reader.onload = async function (event) {
            const content = event.target.result.split(',')[1];
            const data = {
                message: 'Agrega una imagen',
                content: content,
                branch: branchName,
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log('La imagen se ha subido correctamente a GitHub.');

                } else {
                    console.log('Ha ocurrido un error al subir la imagen a GitHub.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ha ocurrido un error inesperado.');
            }
        };
        //Fin de la carga de imagenes al repositorio GitHub


        reader.readAsDataURL(imageFile);
        var predictionUrl;


        //Funcion con timeout para obtener el link de la imagen anteriormente subida a GitHub y la vista previa
        var obtenLink = setTimeout(function () {
            var predictionUrl = "https://retoai-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fe25f955-12ed-4eeb-b136-d513eb1dbb86/classify/iterations/Iteration3/url";
            predictionKey = "f2617404108641b28230adab8b5b1e6a";

            var img = `https://raw.githubusercontent.com/Zawent/AI-900/main/moreImgs/${imageFile.name}`;
            var predictionHeaders = {
                "Prediction-Key": predictionKey,
                "Content-Type": "application/json"
            };

            var requestData = {
                url: img
            };

            var imagenPrevia = document.getElementById("previo2");
            imagenPrevia.src = `https://raw.githubusercontent.com/Zawent/AI-900/main/moreImgs/${imageFile.name}`;

            imageUrl = `https://raw.githubusercontent.com/Zawent/AI-900/main/moreImgs/${imageFile.name}`;
            console.log(imageUrl)

            // Verificar si la URL está vacía
            if (imageUrl.trim() === "") {
                console.log("Por favor, ingresa una URL de imagen válida.");
                return;
            }

            console.log("Analyzing image...\n");

            // Cuerpo de la solicitud JSON
            var requestBody = {
                url: imageUrl
            };

            setTimeout(function () {
                var medidaWidth = previo2.width;
                var medidaHeight = previo2.height;

                var divDeImg = document.getElementById("cuadrados-faces")
                divDeImg.style.width = medidaWidth;
                divDeImg.style.height = medidaHeight;
                divDeImg.style.maxHeight = 20 + "vw";
            })


            // Realizar la solicitud para detectar caras en la imagen
            $.ajax({
                type: "POST",
                url: endpoint + "face/v1.0/detect?detectionModel=detection_01",
                headers: headers,
                data: JSON.stringify(requestBody),
                success: function (result) {
                    console.log("From June 21st 2022, Face service capabilities that return personally identifiable features are restricted.");
                    console.log("See https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/ for details.");
                    console.log("This code is restricted to returning the location of any faces detected:\n");


                    $.each(result, function (index, face) {
                        console.log("Face location: " + JSON.stringify(face.faceRectangle) + "\n");

                        var faceDiv = document.createElement("div");
                        faceDiv.style.position = "absolute";
                        faceDiv.style.top = 0 + "px";
                        faceDiv.style.left = 0 + "px";
                        faceDiv.style.width = face.faceRectangle.width + "px";
                        faceDiv.style.height = face.faceRectangle.height + "px";
                        faceDiv.classList.add("square");

                        var cuadro = document.getElementById("cuadrados-faces");
                        cuadro.appendChild(faceDiv);

                        setTimeout(function () {
                            var cuadroChiqui = document.createElement("div");
                            cuadroChiqui.classList.add("cuadritoChiqui");
                            cuadroChiqui.style.position = "absolute";
                            cuadroChiqui.style.top = face.faceRectangle.top + "px";
                            cuadroChiqui.style.left = face.faceRectangle.left + "px";
                            cuadroChiqui.style.width = face.faceRectangle.width + "px";
                            cuadroChiqui.style.height = face.faceRectangle.height + "px";
                            cuadroChiqui.style.border = "2px solid red";


                            faceDiv.appendChild(cuadroChiqui);

                        }, 2000); // Retraso de 2 segundos
                    });

                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }, 5000);

        // Obtiene el valor del input


        $("#uploadButton2").click(analizarImagen);
    });
});