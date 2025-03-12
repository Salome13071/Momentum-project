import logo from "../../assets/logo.svg ";

export default function Header() {
  console.log("Logo path:", logo);
  return (
    <div>
      <div>
        logo
        <img src={logo} alt="" />
      </div>
      <div>
        <div>axali TanamSromeli </div>
        <div>axali davaleba </div>
      </div>
    </div>
  );
}
