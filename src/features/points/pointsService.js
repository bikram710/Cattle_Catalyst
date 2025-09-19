// Mock service functions - replace with real backend calls

let currentPoints = 100; // Starting points value

export async function getPoints() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(currentPoints), 500);
  });
}

export async function addPoints(amount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentPoints += amount;
      resolve(currentPoints);
    }, 500);
  });
}
