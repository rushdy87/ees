import Select from "../Select/Select";
import EmployeeDataRow from "./EmployeeDataRow/EmployeeDataRow";
import "./EvaluationTable.scss";

const EvaluationTable = ({ employees, label }) => {
  const tableBodyRender = employees.map((employee, index) => (
    <EmployeeDataRow employee={employee} key={employee.id} index={index} />
  ));

  return (
    <div className="EvaluationTable_component" role="region" tabIndex="0">
      <table className="EvaluationTable_table">
        <caption>{label}</caption>
        <thead>
          <tr className="EvaluationTable_header">
            <th className="EvaluationTable_order">#</th>
            <th className="EvaluationTable_name">الاسم</th>
            <th className="EvaluationTable_fileNumber">رقم الحاسبة</th>
            <th className="EvaluationTable_unit">الوحدة</th>
            <th className="EvaluationTable_shift">الوجبة</th>
            <th className="EvaluationTable_evaluation">التقييم</th>
            <th className="EvaluationTable_save">حفظ</th>
          </tr>
        </thead>
        <tbody>{tableBodyRender}</tbody>
      </table>
    </div>
  );
};

export default EvaluationTable;
