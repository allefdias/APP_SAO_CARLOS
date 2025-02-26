document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patient-form");
    const cancerHistory = document.getElementById("cancer-history");
    const cancerDetails = document.getElementById("cancer-details");
    const storyContainer = document.getElementById("story-container");
    const patientStory = document.getElementById("patient-story");
    const copyButton = document.getElementById("copy-button");
    const lotNumberInput = document.getElementById("lot-number");
    const saveLotButton = document.getElementById("save-lot");
    const lotDisplay = document.getElementById("lot-display");
    const copyLotButton = document.createElement("button");
    copyLotButton.textContent = "Copiar Número do Lote";
    copyLotButton.id = "copy-lot-button";
    lotDisplay.parentNode.appendChild(copyLotButton);

    // Carregar o número do lote salvo
    if (localStorage.getItem("lotNumber")) {
        lotDisplay.textContent = `Número de Lote: ${localStorage.getItem("lotNumber")}`;
    }

    saveLotButton.addEventListener("click", function () {
        const lotNumber = lotNumberInput.value.trim().toUpperCase();
        if (lotNumber) {
            localStorage.setItem("lotNumber", lotNumber);
            lotDisplay.textContent = `Número de Lote: ${lotNumber}`;
            alert("Número de lote salvo com sucesso!");
        }
    });

    copyLotButton.addEventListener("click", function () {
        const lotNumber = localStorage.getItem("lotNumber");
        if (lotNumber) {
            navigator.clipboard.writeText(lotNumber).then(() => {
                alert("Número de lote copiado para a área de transferência!");
            }).catch(err => {
                alert("Erro ao copiar número de lote: " + err);
            });
        }
    });

    cancerHistory.addEventListener("change", function () {
        cancerDetails.classList.toggle("hidden", cancerHistory.value !== "Sim");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const examReason = document.getElementById("exam-reason").value.toUpperCase();
        const contrast = document.getElementById("contrast").value.toUpperCase();
        const cancerStatus = cancerHistory.value.toUpperCase();
        let cancerInfo = "";
        if (cancerStatus === "SIM") {
            const cancerType = document.getElementById("cancer-type").value.toUpperCase();
            const chemo = document.getElementById("treatment-chemo").checked ? "QUIMIOTERAPIA" : "";
            const radio = document.getElementById("treatment-radio").checked ? "RADIOTERAPIA" : "";
            const immuno = document.getElementById("treatment-immuno").checked ? "IMUNOTERAPIA" : "";
            
            const treatments = [chemo, radio, immuno].filter(Boolean).join(", ");
            cancerInfo = `PACIENTE JÁ TRATOU CÂNCER DO TIPO ${cancerType} E REALIZOU OS SEGUINTES TRATAMENTOS: ${treatments}.`;
        }
        
        const surgeryHistory = document.getElementById("surgery-history").value.toUpperCase();
        const surgeryInfo = surgeryHistory ? `HISTÓRICO DE CIRURGIAS: ${surgeryHistory}.` : "";
        
        const doctor = document.getElementById("doctor").value.toUpperCase();
        const doctorInfo = doctor ? `EXAME INDICADO PARA MÉDICO ${doctor}.` : "";
        
        const technician = document.getElementById("technician").value.toUpperCase();
        
        const story = `MOTIVO DO EXAME: ${examReason}.\nO EXAME FOI FEITO ${contrast === "SIM" ? "COM" : "SEM"} CONTRASTE.\n${cancerInfo ? cancerInfo + "\n" : ""}${surgeryInfo ? surgeryInfo + "\n" : ""}${doctorInfo ? doctorInfo + "\n" : ""}O EXAME FOI REALIZADO PELO TÉCNICO ${technician}.`;
        
        patientStory.textContent = story;
        patientStory.contentEditable = "true";
        storyContainer.style.display = "block";
        copyButton.style.display = "block";
    });

    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(patientStory.textContent).then(() => {
            alert("HISTÓRIA COPIADA PARA A ÁREA DE TRANSFERÊNCIA!");
        }).catch(err => {
            alert("ERRO AO COPIAR TEXTO: " + err);
        });
    });
});
