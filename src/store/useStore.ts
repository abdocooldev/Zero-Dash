import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Settings from "./../pages/Settings";

export interface User {
  id: number;
  name: string;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  avatar?: string;
  bio: string;
  birthDay: string;
  joinDate: string;
  location: string;
  jobTitle: string;
  programmingField: string;
  experienceYears: number;
  paymentMethod: string;
  paymentEmail: string;
  subscription: string;
  skills: string[];
}
interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  currency: string;
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  progress: number;
  startDate: string;
  deadline: string;
  teamMembers: number[];
  technologies: string[];
}
interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: number;
  modules: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnail?: string;
  price: number;
  currency: string;
  students: number;
  rating: number;
}
interface File {
  id: number;
  name: string;
  type: string;
  category: string;
  size: number;
  unit: string;
  dateUploaded: string;
  uploader: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  currency: string;
  features: {
    name: string;
    description: string;
    availability: boolean;
  }[];
}
interface Setting {
  maintenance: boolean;
  maintenanceMessage: string;
  siteName: string;
  siteLogo: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  password: string;
  passLastChange: string;
  twoFactorAuth: boolean;
  widgetsControl: {
    quickDraft: boolean;
    yearlyTargets: boolean;
    ticketsStatistics: boolean;
    latestNews: boolean;
    latestTasks: boolean;
    topSearchItems: boolean;
  };
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  backup: {
    lastBackup: string;
    backupFrequency: {
      daily: boolean;
      weekly: boolean;
      monthly: boolean;
    };
    backupLocation: {
      local: boolean;
      database: boolean;
      cloud: boolean;
    };
  };
}

interface StoreState {
  users: User[];
  projects: Project[];
  courses: Course[];
  files: File[];
  plans: Plan[];
  settings: Setting;
  loading: boolean;
  error: string | null;

  fetchAllData: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: number) => Promise<User>;
  fetchProjects: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  fetchFiles: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const API_BASE_URL = "http://localhost:3000";

const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      users: [],
      projects: [],
      courses: [],
      files: [],
      plans: [],
      settings: {},
      loading: false,
      error: null,

      // Fetch all data
      fetchAllData: async () => {
        set({ loading: true, error: null });
        try {
          await Promise.all([
            get().fetchUsers(),
            get().fetchProjects(),
            get().fetchCourses(),
            get().fetchFiles(),
            get().fetchPlans(),
            get().fetchSettings(),
          ]);
          set({ loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch data";
          set({ error: errorMessage, loading: false });
          console.error("Error fetching data:", error);
        }
      },

      fetchUsers: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/users`);
          if (!response.ok) throw new Error("Failed to fetch users");
          const data = await response.json();
          set({ users: data || [] });
        } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
        }
      },

      fetchUser: async (id: number) => {
        try {
          const response = await fetch(`${API_BASE_URL}/users/${id}`);
          if (!response.ok) throw new Error("Failed to fetch user");
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching user:", error);
          throw error;
        }
      },

      fetchProjects: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/projects`);
          if (!response.ok) throw new Error("Failed to fetch projects");
          const data = await response.json();
          set({ projects: data || [] });
        } catch (error) {
          console.error("Error fetching projects:", error);
          throw error;
        }
      },

      fetchCourses: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/courses`);
          if (!response.ok) throw new Error("Failed to fetch courses");
          const data = await response.json();
          set({ courses: data || [] });
        } catch (error) {
          console.error("Error fetching courses: ", error);
          throw error;
        }
      },

      fetchFiles: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/files`);
          if (!response.ok) throw new Error("Failed to fetch files");
          const data = await response.json();
          set({ files: data || [] });
        } catch (error) {
          console.error("Error fetching files: ", error);
          throw error;
        }
      },

      fetchPlans: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/plans`);
          if (!response.ok) throw new Error("Failed to fetch plans");
          const data = await response.json();
          set({ plans: data || [] });
        } catch (error) {
          console.error("Error fetching plans: ", error);
          throw error;
        }
      },

      fetchSettings: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/settings`);
          if (!response.ok) throw new Error("Failed to fetch settings");
          const data = await response.json();
          set({ settings: data || {} });
        } catch (error) {
          console.error("Error fetching plans: ", error);
          throw error;
        }
      },

      // Error handling
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: "ZeroDashStore" },
  ),
);

export default useStore;
