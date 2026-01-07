document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const textInput = document.getElementById('qr-text');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const downloadBtn = document.getElementById('download-btn');
    const colorDarkInput = document.getElementById('color-dark');
    const colorLightInput = document.getElementById('color-light');
    const dotStyleSelect = document.getElementById('dot-style');
    const expirationDateInput = document.getElementById('expiration-date');
    const passwordInput = document.getElementById('qr-password');
    const typeButtons = document.querySelectorAll('.type-btn');
    const textInputSection = document.getElementById('text-input-section');
    const vcardInputSection = document.getElementById('vcard-input-section');
    const vcardInputs = document.querySelectorAll('.vcard-input');

    // --- State ---
    let currentQrType = 'text'; // 'text' or 'vcard'

    // --- QR Code Instance ---
    const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: 'canvas', // ✅ MUST be canvas for PNG
        data: 'https://www.google.com/',
        dotsOptions: {
            color: colorDarkInput.value,
            type: dotStyleSelect.value
        },
        backgroundOptions: {
            color: colorLightInput.value
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10
        },
        qrOptions: {
            errorCorrectionLevel: 'H'
        }
    });

    // Append QR
    qrCode.append(qrCodeContainer);

    // --- Event Listeners ---
    textInput.addEventListener('input', updateQRCode);
    colorDarkInput.addEventListener('input', updateQRCode);
    colorLightInput.addEventListener('input', updateQRCode);
    dotStyleSelect.addEventListener('change', updateQRCode);
    vcardInputs.forEach(input => input.addEventListener('input', updateQRCode));

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentQrType = button.dataset.type;

            if (currentQrType === 'text') {
                textInputSection.classList.remove('hidden');
                vcardInputSection.classList.add('hidden');
            } else {
                textInputSection.classList.add('hidden');
                vcardInputSection.classList.remove('hidden');
            }

            updateQRCode();
        });
    });

    expirationDateInput.addEventListener('change', () => {
        const expirationDate = expirationDateInput.value;
        if (expirationDate) {
            alert(
`--- Dynamic QR Code Simulation ---

This QR code
