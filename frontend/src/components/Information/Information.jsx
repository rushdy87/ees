import "./Information.scss";

const Information = ({ units, total, percentages, evaluations }) => {
  return (
    <div className="information-container">
      <div className="information-unit-name_and_total">
        <div className="information-unit-name">
          <h2>الوحدات</h2>
          {units.map((unit) => (
            <span key={unit}>unit</span>
          ))}
        </div>
        <div className="information-unit-total">
          <h2> الكادر</h2>
          <span>{total}</span>
        </div>
      </div>

      <div className="information-percentage">
        <div className="information-percentage_row">
          <h2>ممتاز</h2>
          <span>{percentages.a}</span>
          <h2>الباقي</h2>
          <span>{evaluations.a}</span>
        </div>
        <div className="information-percentage_row">
          <h2>جيد جداً</h2>
          <span>{percentages.b}</span>
          <h2>الباقي</h2>
          <span>{evaluations.b}</span>
        </div>
        <div className="information-percentage_row">
          <h2>جيد</h2>
          <span>{percentages.c}</span>
          <h2>الباقي</h2>
          <span>{evaluations.c}</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
