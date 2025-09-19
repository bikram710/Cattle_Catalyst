// Mock API calls; replace with your backend calls

export async function fetchPawClips() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          url: "https://www.example.com/clips/clip1.mp4",
          title: "Playing in the park",
        },
        {
          id: "2",
          url: "https://www.example.com/clips/clip2.mp4",
          title: "Eating treats",
        },
      ]);
    }, 700);
  });
}

export async function uploadPawClip(file) {
  // Upload API call here
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}
