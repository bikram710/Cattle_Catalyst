// Simulated fetch call to a backend API for matches
export async function fetchMatches() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "Bella", breed: "Golden Retriever", age: 3 },
        { id: "2", name: "Max", breed: "Beagle", age: 2 },
        { id: "3", name: "Lucy", breed: "Poodle", age: 4 },
      ]);
    }, 1000);
  });
}
