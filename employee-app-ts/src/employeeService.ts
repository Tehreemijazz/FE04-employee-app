import type {
  AddEmployeeFn, DeleteEmployeeFn, Employee, EmployeeFilter, EmployeeStatus,
  FilterEmployeesFn, Result, UpdateEmployeeFn, NewEmployee,
} from "./types";
import { nextId } from "./utils";

export const addEmployee: AddEmployeeFn = (list, data) => [
  ...list,
  { ...data, id: nextId(list) },
];

export const updateEmployee: UpdateEmployeeFn = (list, id, changes) =>
  list.map((e) => (e.id === id ? { ...e, ...changes } : e));

export const deleteEmployee: DeleteEmployeeFn = (list, id) =>
  list.filter((e) => e.id !== id);

export const filterEmployees: FilterEmployeesFn = (list, query: EmployeeFilter) => {
  const search = query.search?.trim().toLowerCase() ?? "";
  return list.filter((e) => {
    const matchesSearch =
      search === "" ||
      e.name.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search);
    const matchesStatus = !query.status || query.status === "all" || e.status === query.status;
    const matchesDept =
      query.departmentId === undefined || query.departmentId === "all" || e.departmentId === query.departmentId;
    return matchesSearch && matchesStatus && matchesDept;
  });
};

/** Type narrowing on a union: each branch gets a precise type. */
export function describeStatus(status: EmployeeStatus): string {
  switch (status) {
    case "active": return "Currently working";
    case "on-leave": return "Temporarily away";
    case "terminated": return "No longer employed";
    default: {
      const _exhaustive: never = status; // compile error if a new status is added but not handled
      return _exhaustive;
    }
  }
}

/** Validation returns a discriminated union; callers must narrow on `ok`. */
export function validateEmployee(input: NewEmployee): Result<NewEmployee> {
  if (input.name.trim().length < 2) return { ok: false, error: "Name is too short" };
  if (!/^\S+@\S+\.\S+$/.test(input.email)) return { ok: false, error: "Invalid email" };
  if (input.salary <= 0) return { ok: false, error: "Salary must be positive" };
  return { ok: true, value: input };
}

/** Narrowing with unknown: parse JSON (e.g. from localStorage / API) safely. */
export function parseEmployees(raw: string): Employee[] {
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) return [];
  return data.filter(isEmployee);
}

export function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>; // assertion after runtime checks
  return (
    typeof v.id === "number" &&
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.salary === "number" &&
    typeof v.departmentId === "number" &&
    (v.status === "active" || v.status === "on-leave" || v.status === "terminated")
  );
}

export function formatSalary(amount: number, currency = "PKR"): string {
  return `${currency} ${amount.toLocaleString()}`;
}
