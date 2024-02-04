import { Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";

interface PageControlsClass {
  refreshPage(): void;
  goBack(): void;
  goForward(): void;
}

export default function BrowserControls(props: {
  URLArray: string[];
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  PageControls: PageControlsClass;
}) {
  const [URLInput, setURLInput] = useState("https://www.google.com");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let inputURL = URLInput.trim(); // Remove leading and trailing spaces
      // Regular expression to check if the URL starts with http:// or https://
      const regex = /^(http|https):\/\//;

      if (!regex.test(inputURL)) {
        // If the URL doesn't start with http:// or https://, prepend https://
        inputURL = "https://" + inputURL;
      }
      props.setURLArray([inputURL]);
      window.ipc.send("navigate-to", inputURL);
    }
  };

  useEffect(() => {
    setURLInput(props.URLArray[0]);
  }, [props.URLArray]);

  return (
    <div>
      <div className="h-[50px] bg-zinc-700 p-1 flex rounded-t-xl items-center">
        <div className="align-middle inline-block gap-1 flex mx-2">
          {" "}
          <Button
            type="text"
            shape="circle"
            className="opacity-50 hover:opacity-100 b-minimize"
            onClick={() => props.PageControls.goBack()}
          >
            <img
              src="/images/arrow-back.svg"
              alt="minimize icon"
              width={18}
              className="invert mx-auto"
            />
          </Button>
          <Button
            type="text"
            shape="circle"
            className="opacity-50 hover:opacity-100 b-minimize"
            onClick={() => props.PageControls.goForward()}
          >
            <img
              src="/images/arrow-forward.svg"
              alt="minimize icon"
              width={18}
              className="invert mx-auto"
            />
          </Button>
          <Button
            type="text"
            shape="circle"
            className="opacity-50 hover:opacity-100 b-minimize"
            onClick={() => props.PageControls.refreshPage()}
          >
            <img
              src="/images/refresh.svg"
              alt="minimize icon"
              width={18}
              className="invert mx-auto"
            />
          </Button>
        </div>
        <Input
          className="block my-auto basis-3/4"
          value={URLInput}
          onChange={(e) => setURLInput(e.target.value)}
          onPressEnter={handleKeyPress}
        />
      </div>
    </div>
  );
}
