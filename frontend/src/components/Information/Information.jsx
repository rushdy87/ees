import "./Information.scss";

const Information = ({ units, total, percentages, evaluations }) => {
  return (
    <div className="information-container">
      <div className="information-unit-name">
        <h2>
          الوحدات
          {units.map((unit) => unit)}
        </h2>
        <div className="information-_row">
          <span> الكادر</span>
          <span>{total}</span>
        </div>
      </div>
      <div className="information-percentage">
        <div className="information-_row">
          <span>ممتاز</span>
          <span>{percentages.a}</span>
          <span>الباقي</span>
          <span>{evaluations.a}</span>
        </div>
        <div className="information-_row">
          <span>جيد جداً</span>
          <span>{percentages.b}</span>
          <span>الباقي</span>
          <span>{evaluations.b}</span>
        </div>
        <div className="information-_row">
          <span>جيد</span>
          <span>{percentages.c}</span>
          <span>الباقي</span>
          <span>{evaluations.c}</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
