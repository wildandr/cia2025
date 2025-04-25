const errorMessages: Record<string, string> = {
  // Team related errors
  "team name already exist": "Nama tim sudah digunakan",
  "Team name already exist": "Nama tim sudah digunakan",
  "Team name is already taken": "Nama tim sudah digunakan", 
  "Team already registered": "Tim sudah terdaftar",
  
  // Email related errors
  "email already exist": "Email sudah digunakan",
  "Email already exist": "Email sudah digunakan",
  "Email already registered": "Email sudah terdaftar",
  "Email already exists": "Email sudah digunakan",
  "Invalid email format": "Format email tidak valid",
  
  // File related errors
  "File is required": "File wajib diunggah",
  "File size too large": "Ukuran file terlalu besar",
  "Invalid file format": "Format file tidak sesuai",
  "file too large": "Ukuran file terlalu besar",
  
  // Team member errors
  "team member already registered": "Anggota tim sudah terdaftar di tim lain",
  "Team member already registered": "Anggota tim sudah terdaftar di tim lain",
  
  // General errors
  "Form validation failed": "Validasi formulir gagal",
  "Unknown error occurred during submission": "Terjadi kesalahan saat mengirim formulir",
  "Failed to submit form": "Gagal mengirim formulir",
  "invalid request": "Permintaan tidak valid",
  "unauthorized": "Sesi anda telah berakhir, silakan login kembali",
};

export const getErrorMessage = (error: string): string => {
  // Handle null/undefined errors
  if (!error) return "Terjadi kesalahan yang tidak diketahui";
  
  // Convert error to lowercase for case-insensitive matching
  const lowerError = error.toLowerCase();
  
  // Try to find exact match first
  if (errorMessages[error]) return errorMessages[error];
  
  // Try to find case-insensitive match
  const matchingKey = Object.keys(errorMessages).find(key => 
    key.toLowerCase() === lowerError
  );
  
  if (matchingKey) return errorMessages[matchingKey];
  
  // Return formatted unknown error if no match found
  return `Terjadi kesalahan: ${error}`;
};
