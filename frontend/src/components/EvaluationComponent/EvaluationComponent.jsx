import { useState } from "react";
import Information from "../Information/Information";
import "./EvaluationComponent.scss";
import { getCurrentMonth, getCurrentYear, months } from "../../assets/dates";
import { employees } from "../../assets/data";
import EvaluationTable from "../EvaluationTable/EvaluationTable";
import Select from "../Select/Select";

const EvaluationComponent = () => {
  const percentages = findPercentages(employees.length);

  const [evaluations, setEvaluations] = useState(percentages);
  const [month, setMonth] = useState(getCurrentMonth());

  const units = Array.from(new Set(employees.map((employee) => employee.unit)));

  function findPercentages(total) {
    const percentages = { a: 25, b: 35, c: 40 }; // Percentages must sum to 100%
    const factor = total / 100;

    // Calculate integer values for each key
    const a = Math.round(percentages.a * factor);
    const b = Math.round(percentages.b * factor);
    const c = total - a - b;

    return { a, b, c };
  }

  return (
    <div className="evaluationComponent-container">
      <Information
        units={units}
        total={employees.length}
        percentages={percentages}
        evaluations={evaluations}
      />
      <div className="evaluationComponent_year_month">
        <div className="evaluationComponent_year">
          <h2>السنة</h2>
          <span>{getCurrentYear()}</span>
        </div>
        <div className="evaluationComponent_month">
          <h2>الشهر</h2>
          <Select
            name="month"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            options={Object.entries(months).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
          />
        </div>
      </div>
      <EvaluationTable
        employees={employees}
        label={`${months[month]} - ${getCurrentYear()}`}
      />
    </div>
  );
};

export default EvaluationComponent;
