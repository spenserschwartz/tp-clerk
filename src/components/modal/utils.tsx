import { type GetCityByNameType } from "~/types/router";
import VisitedCityForm from "../forms/visitedCity";
import LoginModal from "./login";

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
    case "VisitedCityForm":
      return (
        <VisitedCityForm
          cityData={data}
          onFormCancel={closeModalHandler}
          onFormSubmit={handleModalAction}
        />
      );

    case "LoginModal":
      return <LoginModal closeModalHandler={closeModalHandler} />;

    default:
      return <div>Modal content not found</div>;
  }
};

export default ModalContent;