import VisitedCityForm from "../forms/visitedCity";
import LoginModal from "./login";

interface ModalMapProps {
  handleModalAction: () => void;
  closeModalHandler: () => void;
  name: string;
}

const ModalContent = ({
  handleModalAction,
  closeModalHandler,
  name,
}: ModalMapProps) => {
  switch (name) {
    case "VisitedCityForm":
      return (
        <VisitedCityForm
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
