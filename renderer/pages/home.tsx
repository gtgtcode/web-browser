import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

import { ipcRenderer } from "electron";

export default function HomePage(props: any) {
  return (
    <React.Fragment>
      <Head>
        <title>Browser</title>
      </Head>
      <div className="flex flex-row w-full">
        <div className="flex gap-1" id="tabs"></div>
        <div className="titlebar grow"></div>
        <div className="">
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
      </div>
    </React.Fragment>
  );
}
