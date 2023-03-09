import { useEffect, useState } from "react";

export const useTeachable = (initialUrl) => {
  const [modelUrl, setModelUrl] = useState(initialUrl);
  const [dispose, setDispose] = useState(false);

  return {
    modelUrl,
    setModelUrl,
    dispose,
  };
};
