import { Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";

interface PageControlsClass {
  refreshPage(): void;
  goBack(): void;
  goForward(): void;
  getURL(index: number): any;
}

export default function BrowserControls(props: {
  URLArray: string[];
  setURLArray: any;
  PageControls: PageControlsClass;
  webContainer: any;
  activeTab: number;
}) {
  const [URLInput, setURLInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let inputURL = URLInput.trim(); // Remove leading and trailing spaces
      // Regular expression to check if the URL starts with http:// or https://
      const regex = /^(http|https):\/\//;

      if (!regex.test(inputURL)) {
        // If the URL doesn't start with http:// or https://, prepend https://
        inputURL = "https://" + inputURL;
      }
      props.setURLArray(() => {
        const newArray = [props.URLArray];
        newArray[props.activeTab] = [inputURL];

        return newArray;
      });
    }
  };

  useEffect(() => {
    setURLInput(props.PageControls.getURL(props.activeTab));
    console.log(props.URLArray);
  }, [props.URLArray, props.activeTab]);

  useEffect(() => {
    // Everything around if statement
    if (props.webContainer && props.webContainer.current) {
      props.webContainer.current[props.activeTab].addEventListener(
        "load-commit",
        () => {
          props.setURLArray(() => {
            const newArray = [props.URLArray];
            newArray[props.activeTab] = [
              props.webContainer.current[props.activeTab].getURL(),
            ];

            return newArray;
          });
        }
      );

      return () => {
        props.webContainer.current[props.activeTab].removeEventListener(
          "load-commit"
        );
      };
    }
  }, [props.webContainer]);

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
