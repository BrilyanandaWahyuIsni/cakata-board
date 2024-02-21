import aesjs from 'aes-js';

function adjusKey(key: Uint8Array, length: number) {
  const a = new Uint16Array(length);
  a.set(key);
  return a;
}

export const keyNandaBrilyanandaWahyuIsni = 'Brilyananda_Wahyu_Isni';

export function encryptJSON(jsonObj: unknown, key: string) {
  const encryptionKey = adjusKey(aesjs.utils.utf8.toBytes(key), 32);

  // Mengonversi objek JSON menjadi string
  const jsonString = JSON.stringify(jsonObj);
  // Mengonversi string menjadi array of bytes
  const textBytes = aesjs.utils.utf8.toBytes(jsonString);
  // Membuat kunci yang sesuai
  const aesCtr = new aesjs.ModeOfOperation.ctr(encryptionKey);
  // Mengenkripsi array of bytes
  const encryptedBytes = aesCtr.encrypt(textBytes);
  // Mengonversi array of bytes menjadi hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

// Fungsi untuk mendekripsi string terenkripsi
export function decryptJSON(encryptedHex: string, key: string) {
  const encryptionKey = adjusKey(aesjs.utils.utf8.toBytes(key), 32);

  // Mengonversi hex menjadi array of bytes
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  // Membuat kunci yang sesuai
  const aesCtr = new aesjs.ModeOfOperation.ctr(encryptionKey);
  // Mendekripsi array of bytes
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  // Mengonversi array of bytes menjadi string
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  // Mengonversi string kembali menjadi objek JSON
  const decryptedObj = JSON.parse(decryptedText);
  return decryptedObj;
}
