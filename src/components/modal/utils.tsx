import type { RouterOutputs } from "~/utils/api";
import VisitedCityForm from "../forms/visitedCity";
import LoginModal from "./login";

type GetCityByNameType = RouterOutputs["city"]["getCityByName"];
interface ModalMapProps {
  handleModalAction: () => void;
  closeModalHandler: () => void;
  data?: GetCityByNameType;
  name: string;
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
