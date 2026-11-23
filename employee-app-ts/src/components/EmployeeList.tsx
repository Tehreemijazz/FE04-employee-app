import type { Department, Employee, ID } from "../types";
import { findById } from "../utils";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  departments: Department[];
  onDelete: (id: ID) => void;
  onStatusChange: (id: ID, status: Employee["status"]) => void;
}

export function EmployeeList({ employees, departments, onDelete, onStatusChange }: EmployeeListProps) {
  if (employees.length === 0) return <p>No employees found.</p>;
  return (
    <ul>
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          department={findById(departments, emp.departmentId)}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
