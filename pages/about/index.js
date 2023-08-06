import { useEffect, useState } from "react";

export default function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://xbxlgxej.api.sanity.io/v2021-06-07/data/query/production?query=*[_type==project]"
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
