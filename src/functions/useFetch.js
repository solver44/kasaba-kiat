import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((val) => {
        if (!val.ok) throw Error("error fetch data");
        return val.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
      })
      .catch((e) => {
        setPending(false);
        setError(e.message);
      });
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
