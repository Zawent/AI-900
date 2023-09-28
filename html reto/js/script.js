$(document).ready(function () {
    var tagName;

    //Inicio de la carga de imagenes a un repositorio generico donde recibe los archivos que el usuario carga en local
    document.getElementById('uploadButton').addEventListener('click', async () => {
        const imageInput = document.getElementById('imageInput');
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

            var imagenPrevia = document.getElementById("previo");
            imagenPrevia.src = `https://raw.githubusercontent.com/Zawent/AI-900/main/moreImgs/${imageFile.name}`;


        }, 5000);


        //Otra funcion con timeout, un poco mas que  el anterior, para que alcance a cargar el link del github, y pueda hacer el analisis
        setTimeout(function () {
            clearInterval(obtenLink)
            predictionUrl = "https://retoai-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fe25f955-12ed-4eeb-b136-d513eb1dbb86/classify/iterations/Iteration3/url";
            predictionHeaders = {
                "Prediction-Key": predictionKey,
                "Content-Type": "application/json"
            };
            img = `https://raw.githubusercontent.com/Zawent/AI-900/main/moreImgs/${imageFile.name}`;
            var requestData = {
                url: img
            };
            $.ajax({
                type: "POST",
                url: predictionUrl,
                headers: predictionHeaders,
                data: JSON.stringify(requestData),
                dataType: "json",
                success: function (data) {
                    var prediction = data;
                    var tagName = prediction.predictions[0].tagName;
                    $("#text").val(tagName);

                    var subscriptionKey = "afb7162c5fdc4e4e9f0d2ec088aa8e0a";
                    var location = "eastus";
                    var endpoint = "https://api.cognitive.microsofttranslator.com/";
                    var text = tagName.toString();

                    // Inicio del codigo de la funcion de traduccion
                    var headers = {
                        "Ocp-Apim-Subscription-Key": subscriptionKey,
                        "Ocp-Apim-Subscription-Region": location,
                        "Content-Type": "application/json"
                    };

                    var data = [
                        {
                            text: text
                        }
                    ];

                    $.ajax({
                        type: "POST",
                        url: endpoint + "translate?api-version=3.0&from=en&to=fr&to=it&to=zh-Hans",
                        headers: headers,
                        data: JSON.stringify(data),
                        success: function (result) {
                            var translations = result[0].translations;
                            var french = translations[0].text;
                            var italian = translations[1].text;
                            var chinese = translations[2].text;

                            console.log("Original Text: " + text);
                            console.log("French Translation: " + french);
                            console.log("Italian Translation: " + italian);
                            console.log("Chinese Translation: " + chinese);
                        },
                        error: function (error) {
                            console.error("Error:", error);
                        }
                    });
                },
                error: function (error) {
                    alert("Ha ocurrido un error en la solicitud de predicción.");
                    console.log(error);
                }
            });
        }, 6000);
    });




    $("#classifyButton").click(function () {
        var predictionUrl = "https://retoai-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fe25f955-12ed-4eeb-b136-d513eb1dbb86/classify/iterations/Iteration3/url";
        var predictionKey = "f2617404108641b28230adab8b5b1e6a";
        var imgNum = 1; // Puedes configurar el número de imagen según tus necesidades

        var img = document.getElementById("link").value;
        var headers = {
            "Prediction-Key": predictionKey,
            "Content-Type": "application/json"
        };

        var requestData = {
            url: img
        };
        var imagenPrevia = document.getElementById("previo");
        imagenPrevia.src = img;


        $.ajax({
            type: "POST",
            url: predictionUrl,
            headers: headers,
            data: JSON.stringify(requestData),
            dataType: "json",
            success: function (data) {
                var prediction = data;
                tagName = prediction.predictions[0].tagName;
                $("#text").val(tagName);

                // Configura tus claves y valores
                var subscriptionKey = "afb7162c5fdc4e4e9f0d2ec088aa8e0a";
                var location = "eastus";
                var endpoint = "https://api.cognitive.microsofttranslator.com/";
                var text = tagName.toString();

                // Prepara los datos para la solicitud de traducción
                var headers = {
                    "Ocp-Apim-Subscription-Key": subscriptionKey,
                    "Ocp-Apim-Subscription-Region": location,
                    "Content-Type": "application/json"
                };

                var data = [
                    {
                        text: text
                    }
                ];

                // Realiza la solicitud de traducción
                $.ajax({
                    type: "POST",
                    url: endpoint + "translate?api-version=3.0&from=en&to=fr&to=it&to=zh-Hans",
                    headers: headers,
                    data: JSON.stringify(data),
                    success: function (result) {
                        var translations = result[0].translations;
                        var french = translations[0].text;
                        var italian = translations[1].text;
                        var chinese = translations[2].text;

                        console.log("Original Text: " + text);
                        console.log("French Translation: " + french);
                        console.log("Italian Translation: " + italian);
                        console.log("Chinese Translation: " + chinese);

                        var frances = document.getElementById("text-FR");
                        frances.value = french;

                        var italiano = document.getElementById("text-IT");
                        italiano.value = italian;

                        var chino = document.getElementById("text-CH");
                        chino.value = chinese;

                        // Agrega la predicción al valor de la variable text
                        text = french; // Cambia esto según el idioma deseado
                        console.log("Nuevo valor de text: " + text);
                    },
                    error: function (error) {
                        console.error("Error:", error);
                    }
                });
            },
            error: function (error) {
                alert("Error")
                console.log(data);
            }
        });
    });







    //Texto a Voz idioma originar (Ingles se supone)
    document.getElementById("convertButton-origin").addEventListener("click", function () {
        // Clave de suscripción de Azure para Text to Speech
        const subscriptionKey = "432eb96bcf074771b18c67f40f631189";
        // Región en la que se tiene configurado el servicio
        const region = "eastus";

        // Endpoint de la API de Texto a Voz
        const endpoint = `https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`;

        // Obtiene el texto ingresado en el campo input
        const textToSpeak = document.getElementById("text").value;

        // Encabezados de la solicitud HTTP
        const headers = {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
        };

        // Crea SSML (Speech Synthesis Markup Language) para el texto
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='en-US'>
            <voice name='en-US-JennyMultilingualNeural'>
                ${textToSpeak}
            </voice>
        </speak>`;
        console.log(ssml);

        // Realiza una solicitud HTTP POST para convertir el texto en voz
        fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: ssml
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                // Crea un Blob a partir del ArrayBuffer recibido
                const blob = new Blob([data], { type: "audio/mpeg" });

                // Crea un elemento de audio para reproducir la voz sintetizada
                const audio = new Audio(URL.createObjectURL(blob));

                // Reproduce el audio
                audio.play();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });



    //Texto a Voz idioma Chino
    document.getElementById("convertButton-chino").addEventListener("click", function () {
        // Clave de suscripción de Azure para Text to Speech
        const subscriptionKey = "432eb96bcf074771b18c67f40f631189";
        // Región en la que se tiene configurado el servicio
        const region = "eastus";

        // Endpoint de la API de Texto a Voz
        const endpoint = `https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`;

        // Obtiene el texto ingresado en el campo input
        const textToSpeak = document.getElementById("text-CH").value;

        // Encabezados de la solicitud HTTP
        const headers = {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
        };

        // Crea SSML (Speech Synthesis Markup Language) para el texto
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='zh-CN'>
            <voice name='zh-CN-XiaoxiaoNeural'>
                ${textToSpeak}
            </voice>
        </speak>`;
        console.log(ssml);

        // Realiza una solicitud HTTP POST para convertir el texto en voz
        fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: ssml
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                // Crea un Blob a partir del ArrayBuffer recibido
                const blob = new Blob([data], { type: "audio/mpeg" });

                // Crea un elemento de audio para reproducir la voz sintetizada
                const audio = new Audio(URL.createObjectURL(blob));

                // Reproduce el audio
                audio.play();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });

    //Texto a Voz idioma Italiano
    document.getElementById("convertButton-ital").addEventListener("click", function () {
        // Clave de suscripción de Azure para Text to Speech
        const subscriptionKey = "432eb96bcf074771b18c67f40f631189";
        // Región en la que se tiene configurado el servicio
        const region = "eastus";

        // Endpoint de la API de Texto a Voz
        const endpoint = `https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`;

        // Obtiene el texto ingresado en el campo input
        const textToSpeak = document.getElementById("text-IT").value;

        // Encabezados de la solicitud HTTP
        const headers = {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
        };

        // Crea SSML (Speech Synthesis Markup Language) para el texto
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='it-IT'>
            <voice name='it-IT-ElsaNeural'>
                ${textToSpeak}
            </voice>
        </speak>`;
        console.log(ssml);

        // Realiza una solicitud HTTP POST para convertir el texto en voz
        fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: ssml
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                // Crea un Blob a partir del ArrayBuffer recibido
                const blob = new Blob([data], { type: "audio/mpeg" });

                // Crea un elemento de audio para reproducir la voz sintetizada
                const audio = new Audio(URL.createObjectURL(blob));

                // Reproduce el audio
                audio.play();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });

    //Texto a Voz idioma Frances
    document.getElementById("convertButton-frances").addEventListener("click", function () {
        // Clave de suscripción de Azure para Text to Speech
        const subscriptionKey = "432eb96bcf074771b18c67f40f631189";
        // Región en la que se tiene configurado el servicio
        const region = "eastus";

        // Endpoint de la API de Texto a Voz
        const endpoint = `https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`;

        // Obtiene el texto ingresado en el campo input
        const textToSpeak = document.getElementById("text-FR").value;

        // Encabezados de la solicitud HTTP
        const headers = {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
        };

        // Crea SSML (Speech Synthesis Markup Language) para el texto
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='fr-FR'>
            <voice name='fr-FR-DeniseNeural'>
                ${textToSpeak}
            </voice>
        </speak>`;
        console.log(ssml);

        // Realiza una solicitud HTTP POST para convertir el texto en voz
        fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: ssml
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                // Crea un Blob a partir del ArrayBuffer recibido
                const blob = new Blob([data], { type: "audio/mpeg" });

                // Crea un elemento de audio para reproducir la voz sintetizada
                const audio = new Audio(URL.createObjectURL(blob));

                // Reproduce el audio
                audio.play();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });

    

   
});






