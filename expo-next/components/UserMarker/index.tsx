import React from "react";
import ReactDOM from "react-dom";

type UserMarkerProps = {
  container: HTMLElement | null;
};

const UserMarker = ({ container }: UserMarkerProps) => {
  if (!container) return null;

  return ReactDOM.createPortal(
    <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_0_20px_rgba(168,85,247,0.2)]"></div>,
    container,
  );
};

export default UserMarker;
