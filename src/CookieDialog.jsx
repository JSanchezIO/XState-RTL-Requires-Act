import * as React from "react";
import { useGDPRMachine } from "./useGDPRMachine";

const CookieDialog = () => {
  const [state, send] = useGDPRMachine();
  const [isCookieDialogOpen, setIsCookieDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (state.value === "optedIn" || state.value === "optedOut") {
      setIsCookieDialogOpen(false);
      return;
    }

    if (state.value === "pendingResponse") {
      setIsCookieDialogOpen(true);
    }
  }, [state.value]);

  const acceptCookies = async () => {
    if (state.value !== "pendingResponse") {
      return;
    }

    send("OPT_IN");
  };

  const declineCookies = async () => {
    if (state.value !== "pendingResponse") {
      return;
    }

    send("OPT_OUT");
  };

  if (!isCookieDialogOpen) {
    return null;
  }

  /** This is actually a reach/ui alert dialog but omitted that to avoid setting up identity-obj-proxy for testing */
  return (
    <div
      style={{
        backgroundColor: "#1976D2",
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "480px",
        padding: "30px",
        width: "33vw",
      }}
    >
      <header>
        <h2>I'm the title of the dialog</h2>
      </header>
      <button onClick={declineCookies}>No Thanks</button>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
};

export default CookieDialog;
