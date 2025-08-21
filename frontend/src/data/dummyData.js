export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    initials: "JD",
    role: "Project Manager",
    status: "online",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    initials: "JS",
    role: "UI/UX Designer",
    status: "online",
    joinedDate: "2024-02-01",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    initials: "MJ",
    role: "Frontend Developer",
    status: "away",
    joinedDate: "2024-01-20",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    initials: "SW",
    role: "Backend Developer",
    status: "online",
    joinedDate: "2024-02-10",
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    initials: "AB",
    role: "DevOps Engineer",
    status: "offline",
    joinedDate: "2024-01-25",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    initials: "ED",
    role: "QA Engineer",
    status: "online",
    joinedDate: "2024-02-05",
  },
];

export const calendarEvents = [
  {
    id: "1",
    title: "Sprint Planning Meeting",
    date: "2025-01-20",
    time: "10:00 AM",
    type: "meeting",
    project: "Website Redesign",
    attendees: [users[0], users[1], users[2]],
  },
  {
    id: "2",
    title: "Design Review Deadline",
    date: "2025-01-22",
    time: "5:00 PM",
    type: "deadline",
    project: "Mobile App Development",
    attendees: [users[1], users[3]],
  },
  {
    id: "3",
    title: "Project Milestone",
    date: "2025-01-25",
    time: "2:00 PM",
    type: "milestone",
    project: "Marketing Campaign",
    attendees: [users[0], users[4], users[5]],
  },
  {
    id: "4",
    title: "Team Standup",
    date: "2025-01-21",
    time: "9:00 AM",
    type: "meeting",
    project: "Website Redesign",
    attendees: users.slice(0, 4),
  },
];

export const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of the company website with modern UI/UX",
    color: "#3B82F6",
    members: [users[0], users[1], users[2]],
    createdAt: "2025-01-01",
    deadline: "2025-03-15",
    progress: 65,
    status: "active",
    columns: [
      {
        id: "todo",
        title: "To Do",
        color: "#6B7280",
        tasks: [
          {
            id: "task-1",
            title: "Create wireframes for homepage",
            description:
              "Design initial wireframes for the new homepage layout including hero section, navigation, and footer",
            assignedUser: users[0],
            deadline: "2025-01-20",
            priority: "high",
            tags: ["Design", "UX", "Homepage"],
            createdAt: "2025-01-10",
            comments: [
              {
                id: "c1",
                user: users[1],
                content:
                  "Should we include a video background in the hero section?",
                createdAt: "2025-01-12",
              },
            ],
            attachments: 2,
            subtasks: [
              {
                id: "st1",
                title: "Research competitor layouts",
                completed: true,
              },
              { id: "st2", title: "Create initial sketches", completed: false },
              {
                id: "st3",
                title: "Design wireframe mockups",
                completed: false,
              },
            ],
          },
          {
            id: "task-2",
            title: "Research competitor websites",
            description:
              "Analyze top 10 competitor websites for design patterns and user experience",
            assignedUser: users[1],
            deadline: "2025-01-18",
            priority: "medium",
            tags: ["Research", "Analysis"],
            createdAt: "2025-01-09",
            comments: [],
            attachments: 0,
            subtasks: [
              { id: "st4", title: "Identify key competitors", completed: true },
              {
                id: "st5",
                title: "Document design patterns",
                completed: false,
              },
            ],
          },
          {
            id: "task-3",
            title: "Setup development environment",
            description:
              "Configure development tools, CI/CD pipeline, and testing framework",
            assignedUser: users[2],
            deadline: "2025-01-15",
            priority: "high",
            tags: ["Development", "Setup", "DevOps"],
            createdAt: "2025-01-08",
            comments: [
              {
                id: "c2",
                user: users[4],
                content: "I can help with the CI/CD setup if needed",
                createdAt: "2025-01-11",
              },
            ],
            attachments: 1,
            subtasks: [
              { id: "st6", title: "Setup Git repository", completed: true },
              {
                id: "st7",
                title: "Configure build pipeline",
                completed: false,
              },
              {
                id: "st8",
                title: "Setup testing environment",
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: "inprogress",
        title: "In Progress",
        color: "#3B82F6",
        tasks: [
          {
            id: "task-4",
            title: "Design color palette and typography",
            description:
              "Create comprehensive brand guidelines including colors, fonts, and visual elements",
            assignedUser: users[3],
            deadline: "2025-01-22",
            priority: "medium",
            tags: ["Design", "Branding"],
            createdAt: "2025-01-07",
            comments: [
              {
                id: "c3",
                user: users[0],
                content:
                  "Please ensure accessibility compliance with color contrast",
                createdAt: "2025-01-13",
              },
            ],
            attachments: 3,
            subtasks: [
              {
                id: "st9",
                title: "Define primary color palette",
                completed: true,
              },
              {
                id: "st10",
                title: "Select typography system",
                completed: true,
              },
              {
                id: "st11",
                title: "Create brand guidelines document",
                completed: false,
              },
            ],
          },
          {
            id: "task-5",
            title: "Create component library",
            description:
              "Build reusable React components with Storybook documentation",
            assignedUser: users[4],
            deadline: "2025-01-25",
            priority: "low",
            tags: ["Development", "Components", "Documentation"],
            createdAt: "2025-01-06",
            comments: [],
            attachments: 0,
            subtasks: [
              { id: "st12", title: "Setup Storybook", completed: true },
              {
                id: "st13",
                title: "Create button components",
                completed: false,
              },
              { id: "st14", title: "Create form components", completed: false },
            ],
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        color: "#10B981",
        tasks: [
          {
            id: "task-6",
            title: "Project kickoff meeting",
            description: "Initial project planning and team alignment session",
            assignedUser: users[0],
            deadline: "2025-01-10",
            priority: "high",
            tags: ["Meeting", "Planning"],
            createdAt: "2025-01-05",
            comments: [
              {
                id: "c4",
                user: users[1],
                content: "Great meeting! Looking forward to the project",
                createdAt: "2025-01-10",
              },
            ],
            attachments: 1,
            subtasks: [
              { id: "st15", title: "Prepare meeting agenda", completed: true },
              { id: "st16", title: "Send meeting notes", completed: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile app for iOS and Android with React Native",
    color: "#10B981",
    members: [users[1], users[2], users[3]],
    createdAt: "2025-01-05",
    deadline: "2025-04-30",
    progress: 25,
    status: "active",
    columns: [
      {
        id: "todo",
        title: "To Do",
        color: "#6B7280",
        tasks: [
          {
            id: "task-7",
            title: "Define app requirements",
            description:
              "Document functional and non-functional requirements for the mobile application",
            assignedUser: users[1],
            deadline: "2025-01-28",
            priority: "high",
            tags: ["Planning", "Requirements"],
            createdAt: "2025-01-11",
            comments: [],
            attachments: 0,
            subtasks: [
              {
                id: "st17",
                title: "Gather stakeholder input",
                completed: false,
              },
              {
                id: "st18",
                title: "Create requirements document",
                completed: false,
              },
            ],
          },
          {
            id: "task-8",
            title: "Create user personas",
            description:
              "Develop detailed user personas based on market research and user interviews",
            assignedUser: users[2],
            deadline: "2025-01-30",
            priority: "medium",
            tags: ["UX", "Research", "Personas"],
            createdAt: "2025-01-12",
            comments: [],
            attachments: 0,
            subtasks: [
              {
                id: "st19",
                title: "Conduct user interviews",
                completed: false,
              },
              { id: "st20", title: "Analyze user data", completed: false },
            ],
          },
        ],
      },
      {
        id: "inprogress",
        title: "In Progress",
        color: "#3B82F6",
        tasks: [
          {
            id: "task-9",
            title: "Setup React Native project",
            description:
              "Initialize React Native project with navigation and state management",
            assignedUser: users[3],
            deadline: "2025-02-05",
            priority: "high",
            tags: ["Development", "Setup", "React Native"],
            createdAt: "2025-01-13",
            comments: [],
            attachments: 0,
            subtasks: [
              {
                id: "st21",
                title: "Initialize project structure",
                completed: true,
              },
              { id: "st22", title: "Setup navigation", completed: false },
              {
                id: "st23",
                title: "Configure state management",
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        color: "#10B981",
        tasks: [],
      },
    ],
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 2025 digital marketing campaign across multiple channels",
    color: "#F59E0B",
    members: [users[4], users[5], users[0]],
    createdAt: "2024-12-15",
    deadline: "2025-03-31",
    progress: 80,
    status: "active",
    columns: [
      {
        id: "todo",
        title: "To Do",
        color: "#6B7280",
        tasks: [
          {
            id: "task-10",
            title: "Create social media content",
            description:
              "Develop engaging content for Instagram, Twitter, and LinkedIn campaigns",
            assignedUser: users[4],
            deadline: "2025-01-25",
            priority: "medium",
            tags: ["Marketing", "Content", "Social Media"],
            createdAt: "2025-01-14",
            comments: [],
            attachments: 0,
            subtasks: [
              { id: "st24", title: "Plan content calendar", completed: false },
              { id: "st25", title: "Create visual assets", completed: false },
            ],
          },
        ],
      },
      {
        id: "inprogress",
        title: "In Progress",
        color: "#3B82F6",
        tasks: [
          {
            id: "task-11",
            title: "Design campaign visuals",
            description:
              "Create banner ads, social media graphics, and promotional materials",
            assignedUser: users[0],
            deadline: "2025-01-20",
            priority: "high",
            tags: ["Design", "Marketing", "Visuals"],
            createdAt: "2025-01-15",
            comments: [],
            attachments: 5,
            subtasks: [
              { id: "st26", title: "Design banner ads", completed: true },
              {
                id: "st27",
                title: "Create social media templates",
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        color: "#10B981",
        tasks: [
          {
            id: "task-12",
            title: "Analyze target audience",
            description:
              "Research and define target demographics for the marketing campaign",
            assignedUser: users[1],
            deadline: "2025-01-15",
            priority: "high",
            tags: ["Research", "Marketing", "Analytics"],
            createdAt: "2025-01-01",
            comments: [
              {
                id: "c5",
                user: users[4],
                content:
                  "Excellent analysis! This will help with our targeting",
                createdAt: "2025-01-16",
              },
            ],
            attachments: 2,
            subtasks: [
              { id: "st28", title: "Conduct market research", completed: true },
              {
                id: "st29",
                title: "Create audience personas",
                completed: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    color: "#8B5CF6",
    members: [users[2], users[3], users[4], users[5]],
    createdAt: "2024-11-01",
    deadline: "2025-06-30",
    progress: 45,
    status: "active",
    columns: [
      {
        id: "todo",
        title: "To Do",
        color: "#6B7280",
        tasks: [],
      },
      {
        id: "inprogress",
        title: "In Progress",
        color: "#3B82F6",
        tasks: [],
      },
      {
        id: "done",
        title: "Done",
        color: "#10B981",
        tasks: [],
      },
    ],
  },
];
