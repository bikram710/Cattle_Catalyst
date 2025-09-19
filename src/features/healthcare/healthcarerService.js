export async function getUpcomingAppointments() {
  // Mock data - replace with real backend API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          date: "2025-10-01",
          petName: "Buddy",
          ownerName: "John Doe",
        },
        {
          id: "2",
          date: "2025-10-03",
          petName: "Luna",
          ownerName: "Jane Smith",
        },
      ]);
    }, 1000);
  });
}
