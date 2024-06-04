import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "User Model",
    description:
      "You can get all the information about All Users, like what projects are they working on and how many followers do they have.",
    link: "#",
  },
  {
    title: "Comprehensive Project Dashboard",
    description:
      "A central dashboard providing an overview of all ongoing projects and Users can upload their projects from the Dashboard.",
    link: "#",
  },
  {
    title: "Real Time Collaboration",
    description:
      "We provide real time collaboration of projects between the users community.",
    link: "#",
  },
  {
    title: "Friends & Followers",
    description:
      "A User can make Friends in real time with our itegrated Friends Request Systen in the App.",
    link: "#",
  },
  {
    title: "Real Time Chat",
    description:
      "ProjectEra has a integrated chat system in the app, that provides real ime Chat between two users .",
    link: "#",
  },

  {
    title: "Seamless File Management",
    description:
      "Easily manage and share project files with integrated cloud storage, ensuring your work is always accessible.",
    link: "#",
  },
];
