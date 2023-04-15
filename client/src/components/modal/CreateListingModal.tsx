import Modal from "./Modal";
import useListingModalState from "../../zustand/listingModal";
import { ReactElement, useMemo, useState } from "react";
import { categories } from "../../categories";

function CreateListingModal() {
  const [step, setStep] = useState(0);
  const listingModal = useListingModalState();
  const handleSubmit = () => {};
  enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
  }
  const onBack = () => {
    setStep((step) => step - 1);
  };
  const onNext = () => {
    setStep((step) => step + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const SecondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const handleBodyContent = (): ReactElement => {
    let bodyContent: ReactElement;
    switch (step) {
      case 1:
        bodyContent = (
          <>
            <p>welcome to create a listing</p>
          </>
        );
      case 2:
        bodyContent = (
          <>
            <p>step 2</p>
          </>
        );
        break;
      case 3:
        bodyContent = (
          <>
            <p>step 3</p>
          </>
        );
        break;
      case 4:
        bodyContent = (
          <>
            <p>step 4</p>
          </>
        );
        break;
      case 5:
        bodyContent = (
          <>
            <p>step 5</p>
          </>
        );
        break;

      default:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <h1>Which of these best describe your place</h1>
            <p>Pick a category</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {categories.map((item) => (
                <div
                  key={item.label}
                  className="col-span-1 border-2 hover:border-black rounded-xl flex flex-col p-4 transition cursor-pointer"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        );
    }
    return bodyContent;
  };

  return (
    <Modal
      isOpen={listingModal.isOpen}
      onClose={listingModal.onClose}
      onSubmit={handleSubmit}
      actionLabel={actionLabel}
      secondaryLabel={SecondaryActionLabel}
      title="ShortLet your home"
      secondaryAction={STEPS.CATEGORY ? undefined : onBack}
      body={handleBodyContent()}
    />
  );
}

export default CreateListingModal;
