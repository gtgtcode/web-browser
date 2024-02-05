import { Button } from "antd";
import { useEffect } from "react";

export default function CreateTab(props: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  URLArray: string[];
}) {
  useEffect(() => {
    console.log(props.URLArray);
  }, [props.URLArray]);
  return (
    <div className="my-auto pt-2">
      <Button
        size="small"
        shape="circle"
        onClick={() => {
          const newURLArray = props.URLArray.concat("https://google.com");
          props.setURLArray(newURLArray);
        }}
      >
        <img
          src="/images/add.svg"
          alt="add"
          className="invert opacity-50 mx-auto"
          width={20}
        />
      </Button>
    </div>
  );
}
