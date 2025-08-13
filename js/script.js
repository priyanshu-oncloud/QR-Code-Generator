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
        width: 200,
        height: 200,
        type: 'svg',
        data: 'https://www.google.com/',
        image: '', // Placeholder for logo
        dotsOptions: {
            color: colorDarkInput.value,
            type: dotStyleSelect.value
        },
        backgroundOptions: {
            color: colorLightInput.value,
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10
        },
        qrOptions: {
            errorCorrectionLevel: 'H' // High correction for logos
        }
    });

    // Append the QR code to the container
    qrCode.append(qrCodeContainer);

    // --- Event Listeners ---
    textInput.addEventListener('input', updateQRCode);
    colorDarkInput.addEventListener('input', updateQRCode);
    colorLightInput.addEventListener('input', updateQRCode);
    dotStyleSelect.addEventListener('change', updateQRCode);
    vcardInputs.forEach(input => input.addEventListener('input', updateQRCode));

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button style
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update state and UI
            currentQrType = button.dataset.type;
            if (currentQrType === 'text') {
                textInputSection.classList.remove('hidden');
                vcardInputSection.classList.add('hidden');
            } else {
                textInputSection.classList.add('hidden');
                vcardInputSection.classList.remove('hidden');
            }
            updateQRCode(); // Regenerate QR on type switch
        });
    });

    expirationDateInput.addEventListener('change', () => {
        const expirationDate = expirationDateInput.value;
        if (expirationDate) {
            // SIMULATION: In a real application, this is where you would
            // make an API call to a backend service. The backend would generate
            // a short URL that redirects to the user's textInput.value,
            // and it would store the expirationDate in a database.
            // The QR code would then be generated for that short URL.

            alert(
`--- Dynamic QR Code Simulation ---

This QR code would now be a 'Dynamic QR Code'.

1. A unique, trackable link would be created on a server.
2. This link would be set to expire on: ${new Date(expirationDate).toLocaleDateString()}.
3. After this date, scanning the QR code would lead to an 'Expired' page.

To fully implement this, a backend server and database are required.`
            );
        }
    });

    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        qrCode.download({ name: 'qrcode', extension: 'png' });
    });

    // --- Core Function ---
    function updateQRCode() {
        const data = textInput.value.trim() || 'https://www.google.com/';
        downloadBtn.style.visibility = textInput.value.trim() ? 'visible' : 'hidden';

        qrCode.update({
            data: data,
            dotsOptions: {
                color: colorDarkInput.value,
                type: dotStyleSelect.value
            },
            backgroundOptions: {
                color: colorLightInput.value
            }
        });
    }

    // Initial call to hide download button if input is empty
    updateQRCode();
});
