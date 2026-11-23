import type { Department, Employee } from "./types";

export const departments: Department[] = [
  { id: 1, name: "Engineering", location: "Islamabad" },
  { id: 2, name: "Human Resources" },
  { id: 3, name: "Marketing", location: "Lahore", managerId: 4 },
];

export const initialEmployees: Employee[] = [
  {
    id: 1, name: "Ali Khan", email: "ali@example.com", position: "Frontend Developer",
    salary: 120000, departmentId: 1, status: "active", hireDate: "2023-02-10",
    skills: ["React", "TypeScript"], phone: "0300-1234567",
  },
  {
    id: 2, name: "Sara Ahmed", email: "sara@example.com", position: "HR Manager",
    salary: 140000, departmentId: 2, status: "on-leave", hireDate: "2021-07-01",
    skills: ["Recruitment"],
  },
  {
    id: 3, name: "Usman Tariq", email: "usman@example.com", position: "Backend Developer",
    salary: 130000, departmentId: 1, status: "active", hireDate: "2022-05-20",
    skills: ["Node.js", "SQL"], address: { city: "Wah Cantt", country: "Pakistan" },
  },
  {
    id: 4, name: "Hina Malik", email: "hina@example.com", position: "Marketing Lead",
    salary: 110000, departmentId: 3, status: "terminated", hireDate: "2020-01-15",
    skills: ["SEO"],
  },
];
