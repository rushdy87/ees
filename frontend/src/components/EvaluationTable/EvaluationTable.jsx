import "./EvaluationTable.scss";

const EvaluationTable = ({ employees, label }) => {
  const tableBodyRender = employees.map((employee, index) => {
    return (
      <tr className="EvaluationTable_row" key={employee.id}>
        <td className="EvaluationTable_order">{index + 1}</td>
        <td className="EvaluationTable_name">{employee.name}</td>
        <td className="EvaluationTable_fileNumber">{employee.fileNumber}</td>
        <td className="EvaluationTable_unit">{employee.unit}</td>
        <td className="EvaluationTable_shift">{employee.shift}</td>
        <td className="EvaluationTable_evaluation">{employee.evaluation}</td>
        <td className="EvaluationTable_save">💾</td>
      </tr>
    );
  });

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
