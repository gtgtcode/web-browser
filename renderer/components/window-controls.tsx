import { Button } from "antd";

export default function WindowControls(props: {
  URLArray: string[];
  setURLArray: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="p-2 text-nowrap">
      {" "}
      <Button
        type="text"
        shape="round"
        size="small"
        className="opacity-50 hover:opacity-100 b-minimize"
        onClick={() => window.ipc.send("minimize", "")}
      >
        <img
          src="/images/minimize-icon.svg"
          alt="minimize icon"
          width={15}
          className="invert"
        />
      </Button>
      <Button
        type="text"
        shape="round"
        size="small"
        className="opacity-50 hover:opacity-100 b-expand"
        onClick={() => window.ipc.send("maximize", "")}
      >
        <img
          src="/images/expand-icon.svg"
          alt="expand icon"
          className="-scale-x-100 invert"
          width={15}
        />
      </Button>
      <Button
        type="text"
        shape="round"
        size="small"
        className="opacity-50 hover:opacity-100 b-close"
        onClick={() => window.ipc.send("close", "")}
      >
        <img
          src="/images/close-icon.svg"
          alt="close icon"
          width={15}
          className="invert"
        />
      </Button>
    </div>
  );
}
