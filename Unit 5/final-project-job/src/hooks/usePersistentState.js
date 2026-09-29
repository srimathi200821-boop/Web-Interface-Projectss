import { useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

/**
 * useState that survives page reloads.
 * The key is read once on mount; to switch keys, remount the component
 * (see `key` on <Workspace /> in App.js).
 */
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => loadJSON(key, initialValue));

  useEffect(() => {
    saveJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
