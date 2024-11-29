import * as React from "react";

export function Divider({ index }) {
  return (
    <img
      loading="lazy"
      src={`http://b.io/ext_${index}-`}
      alt=""
      className="object-contain shrink-0 w-0 aspect-[0] stroke-[1px] stroke-[color:var(--,#DADADA)]"
    />
  );
}