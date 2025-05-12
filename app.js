const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const locationInput = document.getElementById('location');
const themeSelect = document.getElementById('theme');
const downloadPNGButton = document.getElementById('downloadPNG');
const downloadPDFButton = document.getElementById('downloadPDF');
const previewTitle = document.getElementById('previewTitle');
const previewDate = document.getElementById('previewDate');
const previewLocation = document.getElementById('previewLocation');
const invitation = document.getElementById('invitation');
function updatePreview() {
  previewTitle.textContent = titleInput.value || 'Your Event Title';
  previewDate.textContent = dateInput.value ? `Date: ${dateInput.value}` : 'Date: YYYY-MM-DD';
  previewLocation.textContent = locationInput.value ? `Location: ${locationInput.value}` : 'Location: Venue';
  const theme = themeSelect.value;
  invitation.className = 'p-6 rounded-2xl text-center border-4 transition-all duration-300 w-full h-full';
  if (theme === 'pink') {
    invitation.classList.add('border-pink-300', 'bg-pink-100');
  } else if (theme === 'blue') {
    invitation.classList.add('border-blue-300', 'bg-blue-100');
  } else if (theme === 'green') {
    invitation.classList.add('border-green-300', 'bg-green-100');
  }
}
function downloadPNG() {
  html2canvas(invitation, { useCORS: true, backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'invitation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => alert('Download failed: ' + err));
}
function downloadPDF() {
  html2canvas(invitation, { useCORS: true, backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('invitation.pdf');
  }).catch(err => alert('Download failed: ' + err));
}
titleInput.addEventListener('input', updatePreview);
dateInput.addEventListener('input', updatePreview);
locationInput.addEventListener('input', updatePreview);
themeSelect.addEventListener('change', updatePreview);
downloadPNGButton.addEventListener('click', downloadPNG);
downloadPDFButton.addEventListener('click', downloadPDF);
updatePreview();
