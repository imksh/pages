import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SurpriseWaiting from "../../components/birthday/SurpriseWaiting";
import CakeTime from "../../components/birthday/CakeTime";
import BirthdayCelebration from "../../components/birthday/BirthdayCelebration";
import BirthdayCardFlip from "../../components/birthday/BirthdayCardFlip";
import { useParams } from "react-router-dom";
import FinalWish from "../../components/birthday/FinalWish";
import Loading from "../../components/Loading";
import api from "../../config/api";
import Background from "../../components/birthday/Background";

const Birthday = () => {
  const [steps, setSteps] = useState(1);
  const [data, setData] = useState({
    name: "Bestie",
    sender: "Your Friend",
    date: new Date(),
    message:
      "No matter how many birthdays come and go, I just hope you always stay happy, keep smiling and achieve everything you dream of ✨",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const loadBirthday = async () => {
      setSteps(1);

      setIsLoading(true);

      try {
        const res = await api.get(`/public/birthday/${id}`);

        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBirthday();
  }, [id]);

  const onContinue = () => {
    setSteps((prev) => prev + 1);
  };

  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <SurpriseWaiting onContinue={() => setSteps(2)} data={data} />;
      case 2:
        return <CakeTime onContinue={onContinue} data={data} />;
      case 3:
        return <BirthdayCelebration onContinue={onContinue} data={data} />;
      case 4:
        return <BirthdayCardFlip onContinue={onContinue} data={data} />;
      case 5:
        return (
          <FinalWish
            data={data}
            onReplay={() =>
              toast.success(
                ` Just call me  - ${data?.sender ? `Your ${data.sender}` : "Me"} 😄`,
              )
            }
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#050816]">
        <Background />
        <Loading bg="transparent" size="w-44 h-44" />
      </div>
    );
  }

  return <div className="overflow-x-hidden bg-[#12071f]">{renderSteps()}</div>;
};

export default Birthday;
