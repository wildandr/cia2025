
interface LoggerConfig {
    enabled: boolean; // Menentukan apakah logger aktif atau tidak
  }
  
  // Konfigurasi default logger
  const loggerConfig: LoggerConfig = {
    enabled: process.env.NODE_ENV !== "production", // Aktif di development, nonaktif di production
  };
  
  // Implementasi logger
  export const logger = {
    log: (...args: any[]) => {
      if (loggerConfig.enabled) {
        console.log(...args);
      }
    },
    error: (...args: any[]) => {
      if (loggerConfig.enabled) {
        console.error(...args);
      }
    },
    warn: (...args: any[]) => {
      if (loggerConfig.enabled) {
        console.warn(...args);
      }
    },
    info: (...args: any[]) => {
      if (loggerConfig.enabled) {
        console.info(...args);
      }
    },
  };
  
  // Fungsi untuk mengatur konfigurasi logger secara dinamis (opsional)
  export const setLoggerConfig = (config: Partial<LoggerConfig>) => {
    Object.assign(loggerConfig, config);
  };