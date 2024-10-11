import axios from "axios";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  console.log("inputValue", inputValue);
  const [shortenedLink, setShortenedLink] = useState("  ");
  console.log("shortenedLink", shortenedLink);
  const [isCopied, setIsCopied] = useState(false);
  const [loadings, setLoading] = useState(false);

  const fetchingData = async (req, res) => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`,
      );
      setShortenedLink(res.data);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    if (inputValue.length) {
      fetchingData();
    }
  }, [inputValue]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);
  return (
    <div className="result">
      {/* <p>{shortenedLink}</p> */}
      <CopyToClipboard
        text={shortenedLink}
        onCopy={() => setShortenedLink(true)}
      >
        <button className={isCopied ? "copied" : ""}>Copy to Clipboard</button>
      </CopyToClipboard>
    </div>
  );
};

export default LinkResult;
