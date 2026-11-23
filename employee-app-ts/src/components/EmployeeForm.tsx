import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Department, NewEmployee } from "../types";
import { validateEmployee } from "../employeeService";

interface EmployeeFormProps {
  departments: Department[];
  onSubmit: (employee: NewEmployee) => void;
}

const emptyForm: NewEmployee = {
  name: "", email: "", position: "", salary: 0, departmentId: 1,
  status: "active", hireDate: new Date().toISOString().slice(0, 10), skills: [],
};

export function EmployeeForm({ departments, onSubmit }: EmployeeFormProps) {
  const [form, setForm] = useState<NewEmployee>(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numeric = name === "salary" || name === "departmentId";
    setForm((prev) => ({ ...prev, [name]: numeric ? Number(value) : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateEmployee(form);
    if (!result.ok) {
      setError(result.error); // narrowed: has `error`
      return;
    }
    setError(null);
    onSubmit(result.value); // narrowed: has `value`
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
      <input name="salary" type="number" value={form.salary} onChange={handleChange} />
      <select name="departmentId" value={form.departmentId} onChange={handleChange}>
        {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add Employee</button>
    </form>
  );
}
