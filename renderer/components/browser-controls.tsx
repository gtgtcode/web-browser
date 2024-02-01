import { Input } from "antd";
import { useState } from "react";

export default function BrowserControls() {
  const [URLInput, setURLInput] = useState("https://www.google.com");
  const [currentWebsite, setCurrentWebsite] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let inputURL = URLInput.trim(); // Remove leading and trailing spaces
      // Regular expression to check if the URL starts with http:// or https://
      const regex = /^(http|https):\/\//;

      if (!regex.test(inputURL)) {
        // If the URL doesn't start with http:// or https://, prepend https://
        inputURL = "https://" + inputURL;
      }
      setCurrentWebsite(inputURL);
      window.ipc.send("navigate-to", inputURL);
    }
  };

  return (
    <div>
      <div className="h-[40px] border-t border-zinc-800 p-1">
        <Input
          value={URLInput}
          onChange={(e) => setURLInput(e.target.value)}
          onPressEnter={handleKeyPress}
        />
      </div>
    </div>
  );
}
