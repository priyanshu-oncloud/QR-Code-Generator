document.addEventListener("DOMContentLoaded", () => {
    // ---------- DOM ELEMENTS ----------
    const textInput = document.getElementById("qr-text");
    const qrCodeContainer = document.getElementById("qr-code-container");
    const downloadBtn = document.getElementById("download-btn");

    const colorDarkInput = document.getElementById("color-dark");
    const colorLightInput = document.getElementById("color-light");
    const dotStyleSelect = document.getElementById("dot-style");

    const expirationDateInput = document.getElementById("expiration-date");
    const passwordInput = document.getElementById("qr-password");

    const typeButtons = document.querySelectorAll(".type-btn");
    const textInputSection = document.getElementById("text-input-section");
    const vcardInputSection = document.getElementById("vcard-input-section");
    const vcardInputs = document.querySelectorAll(".vcard-input");

    // ---------- STATE ----------
    let currentQrType = "text"; // text | vcard

    // ---------- QR INSTANCE ----------
    const qrCode = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "svg",
        data: "https://www.google.com/",
        dotsOptions: {
            color: colorDarkInput.value,
            type: dotStyleSelect.value
        },
        backgroundOptions: {
            color: colorLightInput.value
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        },
        qrOptions: {
            errorCorrectionLevel: "H"
        }
    });

    qrCode.append(qrCodeContainer);

    // ---------- EVENTS ----------
    textInput.addEventListener("input", updateQRCode);
    colorDarkInput.addEventListener("input", updateQRCode);
    colorLightInput.addEventListener("input", updateQRCode);
    dotStyleSelect.addEventListener("change", updateQRCode);
    vcardInputs.forEach(input => input.addEventListener("input", updateQRCode));

    typeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            typeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentQrType = btn.dataset.type;

            if (currentQrType === "text") {
                textInputSection.classList.remove("hidden");
                vcardInputSection.classList.add("hidden");
            } else {
                textInputSection.classList.add("hidden");
                vcardInputSection.classList.remove("hidden");
            }

            updateQRCode();
        });
    });

    expirationDateInput.addEventListener("change", () => {
        if (expirationDateInput.value) {
            alert(
`Dynamic QR Simulation

This feature requires backend support.

• QR would redirect via server
• Expiry Date: ${new Date(expirationDateInput.value).toDateString()}
• After expiry → QR becomes invalid`
            );
        }
    });

    downloadBtn.addEventListener("click", e => {
        e.preventDefault();
        qrCode.download({ name: "qr-code", extension: "png" });
    });

    // ---------- FUNCTIONS ----------

    function generateVCardData() {
        let vcard = `BEGIN:VCARD
VERSION:3.0`;

        vcardInputs.forEach(input => {
            if (input.value.trim()) {
                const field = input.dataset.field;
                vcard += `\n${field}:${input.value.trim()}`;
            }
        });

        vcard += `\nEND:VCARD`;
        return vcard;
    }

    function updateQRCode() {
        let data = "";

        if (currentQrType === "text") {
            data = textInput.value.trim();
        } else {
            data = generateVCardData();
        }

        if (!data) {
            data = "https://www.google.com/";
            downloadBtn.style.visibility = "hidden";
        } else {
            downloadBtn.style.visibility = "visible";
        }

        qrCode.update({
            data,
            dotsOptions: {
                color: colorDarkInput.value,
                type: dotStyleSelect.value
            },
            backgroundOptions: {
                color: colorLightInput.value
            }
        });
    }

    // Initial load
    updateQRCode();
});
