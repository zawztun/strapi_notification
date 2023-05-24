import { useState } from "react";
import { flushSync } from "react-dom";
import type { Topic } from "../type";

interface Props {
  data: Topic;
  getAllData: () => void;
}
const Noti = ({ data, getAllData }: Props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data.attributes.topic);
  const [status, setStatus] = useState(() => data.attributes.readStatus);

  // const inputElement = React.useRef<HTMLInputElement>(null);
  function updateText(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            topic: value,
          },
        }),
      };
      fetch(
        `http://localhost:1337/api/notifications/${data.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEdit(false);
          getAllData();
        });
    }
  }

  function updateStatus() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          readStatus: !status,
        },
      }),
    };
    fetch(`http://localhost:1337/api/notifications/${data.id}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        getAllData();
        setStatus(!status);
      });
  }

  const editable = () => {
    setEdit(!edit);
  };

  return (
    <div className="p-2">
      <div className={`alert shadow-lg ${!status ? "bg-gray-800" : ""}`}>
        <div className="">
          <img
            src={
              "http://localhost:1337" +
              data?.attributes?.person?.data?.attributes?.profile?.data[0]
                .attributes.formats.thumbnail.url
            }
            alt=""
            className="w-[45px] aspect-square rounded-full bg-white object-cover"
          />
          <div className="flex flex-col justify-start w-full">
            <p className="flex">{data.attributes.topic}</p>

            {edit ? (
              <input
                placeholder="Enter your message "
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-[1000px] bg-transparent outline-none first-line:"
                onKeyDown={updateText}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm btn-ghost" onClick={editable}>
            Edit
          </button>
          <button className="btn btn-sm btn-primary" onClick={updateStatus}>
            {!status ? "Read" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Noti;
