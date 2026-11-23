// ---------- Reusable type aliases ----------
export type ID = number;
export type ISODateString = string; // e.g. "2024-03-15"
export type Predicate<T> = (item: T) => boolean;
export type Comparator<T> = (a: T, b: T) => number;

// ---------- Union / literal types ----------
export type EmployeeStatus = "active" | "on-leave" | "terminated";
export type SortDirection = "asc" | "desc";

// ---------- Interfaces ----------
export interface Department {
  id: ID;
  name: string;
  location?: string; // optional
  managerId?: ID; // optional
}

export interface Address {
  city: string;
  country: string;
}

export interface Employee {
  id: ID;
  name: string;
  email: string;
  position: string;
  salary: number;
  departmentId: ID;
  status: EmployeeStatus;
  hireDate: ISODateString;
  phone?: string; // optional
  address?: Address; // optional
  skills: string[];
}

// Input for creating an employee: id is generated, optionals stay optional
export type NewEmployee = Omit<Employee, "id">;
// Input for updating: any field except id
export type EmployeeUpdate = Partial<Omit<Employee, "id">>;

// ---------- Function types for employee operations ----------
export type AddEmployeeFn = (list: Employee[], data: NewEmployee) => Employee[];
export type UpdateEmployeeFn = (list: Employee[], id: ID, changes: EmployeeUpdate) => Employee[];
export type DeleteEmployeeFn = (list: Employee[], id: ID) => Employee[];
export type FilterEmployeesFn = (list: Employee[], query: EmployeeFilter) => Employee[];

export interface EmployeeFilter {
  search?: string;
  status?: EmployeeStatus | "all";
  departmentId?: ID | "all";
}

// ---------- Result type (discriminated union) for narrowing ----------
export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
