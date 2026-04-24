/**
 * Utility function to handle resume download
 * @param fileName - The name of the resume file (default: 'vmresume.pdf')
 * @param downloadName - The name to save the file as (default: 'vmresume.pdf')
 */
export const handleDownloadResume = (
  fileName: string = 'vmresume.pdf',
  downloadName: string = 'vmresume.pdf'
): void => {
  // Create a link element
  const link = document.createElement('a');
  // Set the href to the resume file path in public folder
  link.href = `/assests/${fileName}`;
  // Set the download attribute with the desired filename
  link.download = downloadName;
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Default resume download function
 * Downloads the default resume file
 */
export const downloadDefaultResume = (): void => {
  handleDownloadResume('vmresume.pdf', 'vmresume.pdf');
};

