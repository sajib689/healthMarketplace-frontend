// Mock profile data for development
export const mockProfileData = {
  firstName: "Tessa",
  lastName: "Wilson",
  email: "",
  role: "INDIVIDUAL",
  userStatus: "ACTIVE",
  profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  about: {
    bio: "Software engineer with 5 years of experience in web development",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
  },
  experiences: [
    {
      id: "1",
      companyName: "Divin Technology",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "Present",
      descriptions:
        "Lead UX Designer responsible for redesigning the company's flagship product, resulting in a 30% increase in user engagement.",
    },
    {
      id: "2",
      companyName: "Creative Solutions",
      location: "Chicago, IL",
      startDate: "2018-03",
      endDate: "2019-12",
      descriptions:
        "Worked on various client projects, focusing on user research, wireframing, and prototyping.",
    },
  ],
  education: [
    {
      id: "1",
      institute: "University of Illinois",
      degree: "Bachelor of Fine Arts, Design",
      startDate: "2014-09",
      endDate: "2018-05",
      descriptions:
        "Focused on digital design and human-computer interaction. Graduated with honors.",
    },
  ],
  resume: null,
};
