import { create } from "zustand";
import { devtools } from "zustand/middleware";

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

interface StoreState {
  users: User[];
  projects: Project[];
  loading: boolean;
  error: string | null;

  fetchAllData: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchProjects: () => Promise<void>;
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
      loading: false,
      error: null,

      // Fetch all data
      fetchAllData: async () => {
        set({ loading: true, error: null });
        try {
          await Promise.all([get().fetchUsers(), get().fetchProjects()]);
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

      // Error handling
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: "ZeroDashStore" },
  ),
);

export default useStore;
