const qrContainer = document.getElementById("qr-code-container");
const textInput = document.getElementById("qr-text");
const colorDark = document.getElementById("color-dark");
const colorLight = document.getElementById("color-light");
const dotStyle = document.getElementById("dot-style");
const customLogo = document.getElementById("custom-logo");
const logoSize = document.getElementById("logo-size");
const downloadBtn = document.getElementById("download-btn");

let selectedLogo = "";

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "",
    dotsOptions: {
        color: colorDark.value,
        type: dotStyle.value
    },
    backgroundOptions: {
        color: colorLight.value
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 8
    }
});

qrCode.append(qrContainer);

function updateQR() {
    qrCode.update({
        data: textInput.value || " ",
        dotsOptions: {
            color: colorDark.value,
            type: dotStyle.value
        },
        backgroundOptions: {
            color: colorLight.value
        },
        image: selectedLogo || undefined,
        imageOptions: {
            imageSize: parseFloat(logoSize.value),
            margin: 8
        }
    });
}

textInput.addEventListener("input", updateQR);
colorDark.addEventListener("change", updateQR);
colorLight.addEventListener("change", updateQR);
dotStyle.addEventListener("change", updateQR);
logoSize.addEventListener("input", updateQR);

document.querySelectorAll(".logo-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedLogo = btn.dataset.logo;
        updateQR();
    });
});

customLogo.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        selectedLogo = reader.result;
        updateQR();
    };
    reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", () => {
    qrCode.download({ name: "qr-code", extension: "png" });
});
