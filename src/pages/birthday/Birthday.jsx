import React, { useState } from "react";
import toast from "react-hot-toast";
import SurpriseWaiting from "../../components/birthday/SurpriseWaiting";
import CakeTime from "../../components/birthday/CakeTime";
import BirthdayCelebration from "../../components/birthday/BirthdayCelebration";
import BirthdayCardFlip from "../../components/birthday/BirthdayCardFlip";
import { useParams } from "react-router-dom";
import FinalWish from "../../components/birthday/FinalWish";

const Birthday = () => {
  const [steps, setSteps] = useState(1);
  const param = useParams();
  const name = param?.name
    ? param.name.charAt(0).toUpperCase() + param.name.slice(1)
    : null;
  const sender = param?.sender
    ? param.sender.charAt(0).toUpperCase() + param.sender.slice(1)
    : null;
  const onContinue = () => {
    setSteps((prev) => prev + 1);
  };

  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <SurpriseWaiting onContinue={() => setSteps(2)} name={name} />;
      case 2:
        return <CakeTime onContinue={onContinue} name={name} />;
      case 3:
        return <BirthdayCelebration onContinue={onContinue} name={name} />;
      case 4:
        return (
          <BirthdayCardFlip
            onContinue={onContinue}
            name={name}
            sender={sender}
          />
        );
      case 5:
        return (
          <FinalWish
            name={name}
            sender={sender}
            onReplay={() =>
              toast.success(` Just call me  - ${sender || "Me"} 😄`)
            }
          />
        );
      default:
        return null;
    }
  };

  return <div className="overflow-x-hidden bg-[#12071f]">{renderSteps()}</div>;
};

export default Birthday;
