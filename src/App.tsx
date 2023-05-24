import "./App.css";
import { useEffect, useState } from "react";
import Noti from "./components/Noti";
import type { Notifications } from "./type";

function App() {
  const [topics, setTopics] = useState<Notifications>();

  function getAllData() {
    fetch(
      "http://localhost:1337/api/notifications?[populate][0]=person.profile"
    )
      .then((res) => res.json())
      .then((data) => setTopics(data));
  }
  console.log(topics);
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      {topics?.data.map((topic) => (
        <Noti key={topic.id} data={topic} getAllData={getAllData} />
      ))}
    </>
  );
}

export default App;
