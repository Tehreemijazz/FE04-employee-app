import type { Department, Employee, ID } from "../types";
import { describeStatus, formatSalary } from "../employeeService";

interface EmployeeCardProps {
  employee: Employee;
  department?: Department; // optional prop
  onDelete: (id: ID) => void;
  onStatusChange: (id: ID, status: Employee["status"]) => void;
}

export function EmployeeCard({ employee, department, onDelete, onStatusChange }: EmployeeCardProps) {
  return (
    <li className={`card status-${employee.status}`}>
      <h3>{employee.name}</h3>
      <p>{employee.position} — {department?.name ?? "Unassigned"}</p>
      <p>{formatSalary(employee.salary)}</p>
      <p>{describeStatus(employee.status)}</p>
      {employee.address && <p>{employee.address.city}, {employee.address.country}</p>}
      <select
        value={employee.status}
        onChange={(e) => onStatusChange(employee.id, e.target.value as Employee["status"])}
      >
        <option value="active">Active</option>
        <option value="on-leave">On leave</option>
        <option value="terminated">Terminated</option>
      </select>
      <button onClick={() => onDelete(employee.id)}>Delete</button>
    </li>
  );
}
