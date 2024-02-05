import { MutableRefObject, useEffect, useState } from "react";

interface PageControlsClass {
  refreshPage(): void;
  goBack(): void;
  goForward(): void;
  getTitles(): string[];
  getURL(index: number): any;
  isCurrentlyAudible(index: number);
}

export default function TabTemplate(props: {
  URLArray: string[];
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  key: string;
  PageControls: PageControlsClass;
  webContainer: MutableRefObject<any[]>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}) {
  const title = props.PageControls.getTitles();
  const [URLTitle, setURLTitle] = useState([]);
  const [pageURL, setPageURL] = useState("");

  useEffect(() => {
    const titles = props.PageControls.getTitles();
    setPageURL(props.PageControls.getURL(props.index));
    console.log(titles);
    setURLTitle(titles);
  }, [props.URLArray, props.activeTab]);

  useEffect(() => {
    if (props.webContainer && props.webContainer.current) {
      props.webContainer.current[props.index].addEventListener(
        "media-started-playing",
        () => {
          console.log("media playing on tab " + props.index);
        }
      );

      return () => {
        props.webContainer.current[props.index].removeEventListener(
          "media-started-playing",
          null
        );
      };
    }
  }, []);

  return (
    <div
      className={
        props.activeTab === props.index
          ? "bg-zinc-700 rounded-t-xl mt-1 pt-1 px-4 max-w-[200px] relative basis-80 overflow-hidden max-h-[40px] bg-gradient-to-l from-zinc-700"
          : "hover:bg-blue-700 group rounded-t-xl mt-1 pt-1 px-4 max-w-[200px] relative basis-80 overflow-hidden max-h-[40px] bg-gradient-to-t to-20% from-zinc-800"
      }
      onClick={() => props.setActiveTab(props.index)}
    >
      <div className="align-middle inline-block">
        <div className="inline select-none drag-none text-nowrap">
          <img
            className="inline select-none"
            src={
              "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
              pageURL
            }
            alt=""
          />

          <p className="md:inline pl-2 text-sm text-zinc-400 select-none hidden truncate absolute top-1/2 -translate-y-1/2">
            {URLTitle[props.index] || ""}
          </p>
          <div
            className={
              (props.activeTab < props.index
                ? "bg-gradient-to-r"
                : "bg-gradient-to-l") +
              (props.activeTab - props.index === 1 ||
              props.activeTab - props.index === 0 ||
              props.activeTab - props.index === -1
                ? " "
                : " hidden ") +
              (props.activeTab !== props.index ? " group-hover:hidden " : "") +
              " from-zinc-700 absolute w-full h-full to-50% top-0 left-0"
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
