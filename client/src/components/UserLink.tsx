import React from "react";
import { Link } from "react-router-dom";

interface Props {
  url: string;
  title: string;
}

function UserLink({ url, title }: Props) {
  return (
    <div className="px-3 py-2 hover:bg-black/5 cursor-pointer">
      <Link to={url}>{title}</Link>
    </div>
  );
}

export default UserLink;
