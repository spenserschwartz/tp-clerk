import MakeItineraryForm from "../forms/makeItinerary";
import VisitedCityForm from "../forms/visitedCity";

interface ModalMapProps {
  handleFormSubmit: () => void;
  closeModalHandler: () => void;
  name: string;
}

const ModalMap = ({
  handleFormSubmit,
  closeModalHandler,
  name,
}: ModalMapProps) => {
  switch (name) {
    case "VisitedCityForm":
      return (
        <VisitedCityForm
          onFormCancel={closeModalHandler}
          onFormSubmit={handleFormSubmit}
        />
      );

    case "MakeItineraryForm":
      return (
        <MakeItineraryForm
          onFormCancel={closeModalHandler}
          onFormSubmit={handleFormSubmit}
        />
      );
    default:
      return <div>Modal not found</div>;
  }
};

export default ModalMap;
