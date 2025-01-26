import { useState } from "react";
import Information from "../Information/Information";
import "./EvaluationComponent.scss";
import { getCurrentMonth, getCurrentYear, months } from "../../assets/dates";
import { employees } from "../../assets/data";
import EvaluationTable from "../EvaluationTable/EvaluationTable";

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
    <div className="EvaluationComponent-container">
      <Information
        units={units}
        total={employees.length}
        percentages={percentages}
        evaluations={evaluations}
      />
      <div className="EvaluationComponent_month_year">
        <div className="EvaluationComponent_month">
          <span>الشهر</span>
          <select
            name="month"
            id="month"
            defaultValue={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Object.entries(months).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="EvaluationComponent_year">
          <span>السنة</span>
          <span>{getCurrentYear()}</span>
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
