// Mock service for fetching and saving settings (replace with real API calls)

let userSettings = {
  notifications: true,
  theme: "light",
  language: "en",
};

export async function fetchSettings() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(userSettings), 800);
  });
}

export async function saveSettings(newSettings) {
  return new Promise((resolve) => {
    setTimeout(() => {
      userSettings = { ...newSettings };
      resolve();
    }, 800);
  });
}
