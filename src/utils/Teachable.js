import React, { useState, useEffect } from "react";
import { ImageModel } from "react-teachable-machine";
import { useTeachable } from "../hooks/useTeachable";
import signOrder from "./song1";

const Teachable = () => {
  const { dispose, modelUrl, setModelUrl } = useTeachable(
    "https://teachablemachine.withgoogle.com/models/DoT35G9In/"
  );

  let len = [];

  function watchSign(prediction) {
    if (len.length < 5) {
      if (prediction[1].probability > 0.7) {
        len = [...len, prediction[1].className];
        console.log(len);
      }
    } else {
      setModelUrl(null);
    }
  }

  function stopWatch() {
    console.log("Done");
  }

  return (
    <div>
      {!dispose && (
        <ImageModel
          model_url={modelUrl}
          preview={true}
          size={500}
          info={true}
          interval={1000}
          onPredict={(prediction) =>
            modelUrl ? watchSign(prediction) : stopWatch()
          }
        />
      )}
      {dispose && <h1> Must dispose </h1>}
    </div>
  );
};

export default Teachable;
