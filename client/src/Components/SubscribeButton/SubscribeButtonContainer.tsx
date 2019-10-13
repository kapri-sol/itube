import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SUBSCRIBE, UNSUBSCRIBE } from "./SubscribeButtonQueries";
import SubscribeButtonPresenter from "./SubscribeButtonPresenter";

const SubscribeButtonContainer = ({ isSubscribe, id }) => {
  const [isSubscribeS, setIsSubscribe] = useState(isSubscribe);
  const [subscribeMutation] = useMutation(SUBSCRIBE, { variables: { id } });
  const [unsubscribeMutation] = useMutation(UNSUBSCRIBE, { variables: { id } });

  const onClick = () => {
    if (isSubscribeS === true) {
      setIsSubscribe(false);
      unsubscribeMutation();
    } else {
      setIsSubscribe(true);
      subscribeMutation();
    }
  };
  return (
    <SubscribeButtonPresenter isSubscribe={isSubscribeS} onClick={onClick} />
  );
};

export default SubscribeButtonContainer;
