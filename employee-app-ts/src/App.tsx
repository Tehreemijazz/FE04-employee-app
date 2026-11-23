import { useMemo, useState } from "react";
import type { Employee, EmployeeFilter, ID, NewEmployee } from "./types";
import { departments, initialEmployees } from "./data";
import {
  addEmployee, deleteEmployee, filterEmployees, updateEmployee,
} from "./employeeService";
import { countWhere } from "./utils";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [filter, setFilter] = useState<EmployeeFilter>({ search: "", status: "all", departmentId: "all" });

  const visible = useMemo(() => filterEmployees(employees, filter), [employees, filter]);
  const activeCount = countWhere(employees, (e) => e.status === "active");

  const handleAdd = (data: NewEmployee) => setEmployees((prev) => addEmployee(prev, data));
  const handleDelete = (id: ID) => setEmployees((prev) => deleteEmployee(prev, id));
  const handleStatus = (id: ID, status: Employee["status"]) =>
    setEmployees((prev) => updateEmployee(prev, id, { status }));

  return (
    <main>
      <h1>Employee Management</h1>
      <p>{employees.length} employees ({activeCount} active)</p>
      <input
        placeholder="Search..."
        value={filter.search ?? ""}
        onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
      />
      <EmployeeForm departments={departments} onSubmit={handleAdd} />
      <EmployeeList employees={visible} departments={departments} onDelete={handleDelete} onStatusChange={handleStatus} />
    </main>
  );
}
