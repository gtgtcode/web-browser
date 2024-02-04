import { useEffect, useState } from "react";

interface PageControlsClass {
  refreshPage(): void;
  goBack(): void;
  goForward(): void;
  getTitle(): string;
}

export default function TabTemplate(props: {
  URLArray: string[];
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  index: string;
  PageControls: PageControlsClass;
}) {
  const [URLTitle, setURLTitle] = useState(props.PageControls.getTitle());

  useEffect(() => {
    setURLTitle(props.PageControls.getTitle());
  }, [props.URLArray]);

  return (
    <div className="bg-zinc-700 rounded-t-xl mt-1 pt-1 px-4 max-w-[200px] relative basis-80 overflow-hidden max-h-[40px] bg-gradient-to-l from-zinc-700">
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
          <div className="bg-gradient-to-l from-zinc-700 absolute w-full h-full to-50% top-0 left-0"></div>
        </div>
      </div>
    </div>
  );
}
