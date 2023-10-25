import { useQuery } from "@tanstack/react-query";
import { File } from "./file.model";

export const useFiles = () => {
  return useQuery<File[]>({
    queryKey: ["files"],
    queryFn: () => [
      { name: "Root", children: ["system32"] },
      { name: "Downloads" },
      { name: "Images", children: ["Dog.jpg", "cat.png"] },
      {
        name: "Videos",
        children: [
          { name: "Jan 4", children: ["wedding1.mp4", "wedding2.mp4"] },
          { name: "Dev 24", children: ["christmas1.mp4", "christmas2.mp4"] },
        ],
      },
      {
        name: "Music",
        children: [
          {
            name: "Rock",
            children: [
              {
                name: "AC/DC",
                children: ["Thunderstruck.mp3", "Back In Black.mp3"],
              },
              {
                name: "Led Zeplin",
                children: ["Stairway to Heaven.mp3"],
              },
            ],
          },
          {
            name: "Pop",
            children: [
              {
                name: "Rihanna",
                children: ["Diamonds.mp3", "Stay.mp3"],
              },
              {
                name: "Bruno Mars",
                children: ["Gorillaz.mp3"],
              },
            ],
          },
          { name: "Unknown", children: ["unlabeled1.mp3", "unlabeled2.mp3"] },
        ],
      },
    ],
  });
};
