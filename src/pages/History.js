import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div>
      <h1>Search History</h1>
      {history.length > 0 ? (
        history.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
};

export default History;
