import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-refinery">
        <h3>وزارة النفط</h3>
        <h3>مصفى كربلاء</h3>
      </div>
      <div className="header-headline">
        <h1>نظام تقييم الموظفين</h1>
        <h2>شعبة الاستلام والتجهيز</h2>
      </div>
      <div className="header-links"></div>
    </div>
  );
};

export default Header;
