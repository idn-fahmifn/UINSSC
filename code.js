// Mengambil string output dari item pertama
const rawOutput = $input.first().json.output

// Parse string JSON menjadi objek JavaScript
const parsedData = JSON.parse(rawOutput);

// Fungsi untuk konversi ISO string ke format tanggal Indonesia (WIB)
function formatTanggal(isoString) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatter.format(date);
}

// Fungsi untuk konversi ISO string ke format jam WIB
function formatJam(isoString) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  // Mengubah titik dua (10:00) menjadi titik (10.00) agar sesuai format WIB
  const timeFormatted = formatter.format(date).replace(':', '.');
  return `${timeFormatted} WIB`;
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



{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["created", "updated", "deleted", "read", "need_info", "error"],
      "description": "Hasil operasi yang dilakukan"
    },
    "message": {
      "type": "string",
      "description": "Kalimat yang dibaca pengguna. Wajib selalu diisi."
    },
    "summary": {
      "type": "string",
      "description": "Nama acara"
    },
    "start": {
      "type": "string",
      "description": "Waktu mulai ISO-8601 dengan offset +07:00"
    },
    "end": {
      "type": "string",
      "description": "Waktu selesai ISO-8601 dengan offset +07:00"
    },
    "location": {
      "type": "string",
      "description": "Lokasi acara"
    },
    "description": {
      "type": "string",
      "description": "Deskripsi acara"
    },
    "event_id": {
      "type": "string",
      "description": "ID acara Google Calendar, diisi untuk update dan delete"
    },
    "events": {
      "type": "array",
      "description": "Daftar acara, hanya untuk status read",
      "items": {
        "type": "object",
        "properties": {
          "summary": { "type": "string" },
          "start": { "type": "string" },
          "end": { "type": "string" },
          "location": { "type": "string" },
          "event_id": { "type": "string" }
        },
        "required": ["summary", "start"]
      }
    }
  },
  "required": ["status", "message"]
}

