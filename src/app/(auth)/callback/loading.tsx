import Spinner from "@/components/global/spinner";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div>
      <Spinner />
    </div>
  );
};

export default loading;
