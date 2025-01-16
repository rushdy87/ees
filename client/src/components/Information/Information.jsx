import "./Information.scss";

const Information = () => {
  return (
    <div className="information-container">
      <div className="information-unit-name">
        <h2>unit 45</h2>
        <div className="information-_row">
          <span> الكادر</span>
          <span>22</span>
        </div>
      </div>
      <div className="information-percentage">
        <div className="information-_row">
          <span>ممتاز</span>
          <span>5</span>
          <span>الباقي</span>
          <span>5</span>
        </div>
        <div className="information-_row">
          <span>جيد جداً</span>
          <span>8</span>
          <span>الباقي</span>
          <span>8</span>
        </div>
        <div className="information-_row">
          <span>جيد</span>
          <span>9</span>
          <span>الباقي</span>
          <span>9</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
