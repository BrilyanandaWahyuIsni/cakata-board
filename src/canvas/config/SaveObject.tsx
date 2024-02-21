type SaveTextToFileProps = {
  textToSave: string;
  nameFile: string;
};

export const saveTextToFile = ({
  textToSave,
  nameFile,
}: SaveTextToFileProps) => {
  // Membuat blob dari teks
  const blob = new Blob([textToSave], { type: 'text/plain' });

  // Membuat URL dari blob
  const url = URL.createObjectURL(blob);

  // Membuat elemen <a> untuk menautkan ke URL
  const link = document.createElement('a');
  link.href = url;
  link.download = `${nameFile}.nanda`;

  // Menambahkan elemen <a> ke dalam dokumen dan mengkliknya secara otomatis
  document.body.appendChild(link);
  link.click();

  // Menghapus elemen <a> dan URL setelah file didownload
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
