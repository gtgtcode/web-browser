import { useState } from "react";

export default function TabTemplate(props: {
  URLArray: string[];
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  index: string;
}) {
  const [URLTitle, setURLTitle] = useState("");
  const getURLTitle = async (url: string) => {
    return fetch(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll("title")[0];
        setURLTitle(title.innerText);
        return title.innerText;
      });
  };

  getURLTitle(props.index);

  return (
    <div className="bg-zinc-700 rounded-t-xl mt-1 pt-1 px-4 max-w-[200px] relative basis-80 overflow-hidden">
      <div className="align-middle inline-block">
        <div className="inline select-none drag-none text-nowrap">
          <img
            className="inline select-none"
            src={
              "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
              props.index
            }
            alt=""
          />
          <p className="md:inline pl-2 text-sm text-zinc-400 select-none hidden truncate absolute top-1/2 -translate-y-1/2">
            {URLTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
