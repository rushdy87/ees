import { useState } from "react";
import Select from "../../Select/Select";
import { degrees } from "../../../assets/degrees";

const EmployeeDataRow = ({ employee, index }) => {
  const [degree, setDegree] = useState(employee.evaluation || 0);
  const [editing, setEditing] = useState(!degree);

  return (
    <tr className="EvaluationTable_row">
      <td className="EvaluationTable_order">{index + 1}</td>
      <td className="EvaluationTable_name">{employee.name}</td>
      <td className="EvaluationTable_fileNumber">{employee.fileNumber}</td>
      <td className="EvaluationTable_unit">{employee.unit}</td>
      <td className="EvaluationTable_shift">{employee.shift}</td>
      <td className="EvaluationTable_evaluation">
        {editing ? (
          <Select
            name="evaluation"
            id="evaluation"
            value={degree}
            onChange={(e) => {
              setDegree(e.target.value);
              setEditing(false);
            }}
            options={degrees}
          />
        ) : (
          degree
        )}
      </td>
      {!editing && (
        <td className="EvaluationTable_save_edit">
          <span>💾 - </span>
          <span onClick={() => setEditing(true)}>📝</span>
        </td>
      )}
    </tr>
  );
};

export default EmployeeDataRow;
