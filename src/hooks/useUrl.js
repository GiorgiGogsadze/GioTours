import { useSearchParams } from "react-router-dom";

export function useUrl(name) {
  const [searchParams, setSearchParams] = useSearchParams();

  function setValue(value) {
    setSearchParams(() => {
      const params = new URLSearchParams(window.location.search);
      params.set(name, value);
      return params;
    });
    // searchParams.set(name, value);
    // setSearchParams(searchParams);
  }
  function remove() {
    setSearchParams(() => {
      const params = new URLSearchParams(window.location.search);
      params.delete(name);
      return params;
    });
    // searchParams.delete(name);
    // setSearchParams(searchParams);
  }
  return { value: searchParams.get(name), setValue, remove, searchParams };
}
