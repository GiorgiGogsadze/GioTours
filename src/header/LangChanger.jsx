import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../data/langSlice";

export default function LangChanger() {
  const { langs, currentLang } = useSelector((store) => store.lang);
  const dispach = useDispatch();
  return (
    <select
      title="lang"
      name="lang"
      className="lang-input"
      value={currentLang}
      onChange={(e) => dispach(changeLang(e.target.value))}
    >
      {langs.map((el) => (
        <option key={el.value} value={el.value}>
          {el.flag}
        </option>
      ))}
    </select>
  );
}
