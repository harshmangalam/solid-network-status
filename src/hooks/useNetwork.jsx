import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
export default function useNetwork() {
  const [network, setNetwork] = createStore({
    isOnline: true,
    connection: {
      type: null,
      effectiveType: null,
      downlink: null,
      rtt: null,
      saveData: null,
    },
  });

  const handleStatusChange = (e) => {
    const isOnline = e.type === "online";
    setNetwork("isOnline", isOnline);
  };

  const checkNetworkStatus = () => {
    const isOnline = window.navigator.onLine;
    setNetwork("isOnline", isOnline);
  };

  const handleConnectionChange = (event) => {
    const connection = event?.target || window.navigator.connection || {};

    setNetwork("connection", {
      type: connection.type,
      downlink: connection.downlink,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      saveData: connection.saveData,
    });
  };
  onMount(() => {
    checkNetworkStatus();
    if (typeof window.navigator.connection !== "undefined") {
      handleConnectionChange();
      window.navigator.connection.addEventListener(
        "change",
        handleConnectionChange
      );
    }
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
  });

  onCleanup(() => {
    window.removeEventListener("online", handleStatusChange);
    window.removeEventListener("offline", handleStatusChange);
    if (typeof window.navigator.connection !== "undefined") {
      window.navigator.connection.removeEventListener(
        "change",
        handleConnectionChange
      );
    }
  });

  return {
    network,
  };
}
