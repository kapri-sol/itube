import React from "react";
import Button from "../Button";

export default ({ isSubscribe, onClick }) => (
  <Button text={isSubscribe ? "구독 취소" : "구독"} onClick={onClick} />
);
