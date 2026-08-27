// Mengambil string output dari item pertama
const rawOutput = $input.first().json.output

// Parse string JSON menjadi objek JavaScript
const parsedData = JSON.parse(rawOutput);

// Fungsi untuk konversi ISO string ke format tanggal Indonesia
function formatTanggal(isoString) {
  const date = new Date(isoString);
  const hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
  const tanggal = date.getDate();
  const bulan = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date); // 'long' huruf kecil
  const tahun = date.getFullYear();
  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

// Fungsi untuk konversi ISO string ke format jam WIB
function formatJam(isoString) {
  const date = new Date(isoString);
  const jam = String(date.getHours()).padStart(2, '0');
  const menit = String(date.getMinutes()).padStart(2, '0');
  return `${jam}.${menit} WIB`;
}

// Output untuk n8n
return [
  {
    json: {
      nama_acara: parsedData.summary || "",
      tanggal: parsedData.start ? formatTanggal(parsedData.start) : "",
      waktu_mulai: parsedData.start ? formatJam(parsedData.start) : "",
      selesai: parsedData.end ? formatJam(parsedData.end) : "",
      deskripsi: parsedData.description || "",
      lokasi: parsedData.location || ""
    }
  }
];
