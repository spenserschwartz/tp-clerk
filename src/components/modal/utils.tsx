import { type GetCityByNameType } from "~/types/router";
import VisitedCityForm from "../forms/VisitedCity";

import LoginModal from "./Login";

export type ModalName = "VisitedCityForm" | "LoginModal";

interface ModalMapProps {
  handleModalAction: () => void;
  closeModalHandler: () => void;
  data?: GetCityByNameType; // add more as needed
  name: ModalName;
}

const ModalContent = ({
  closeModalHandler,
  data,
  handleModalAction,
  name,
}: ModalMapProps) => {
  switch (name) {
    case "LoginModal":
      return <LoginModal closeModalHandler={closeModalHandler} />;

    case "VisitedCityForm":
      return (
        <VisitedCityForm
          cityData={data}
          onFormCancel={closeModalHandler}
          onFormSubmit={handleModalAction}
        />
      );

    default:
      return <div>Modal content not found</div>;
  }
};

export default ModalContent;
