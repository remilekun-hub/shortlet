import Modal from "./Modal";
import useListingModalState from "../../zustand/listingModal";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { categories } from "../../data/categories";

function CreateListingModal() {
  enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
  }
  const [step, setStep] = useState(STEPS.CATEGORY);
  const listingModal = useListingModalState();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const formData = { category, location };
  console.log({ step });

  const handleSubmit = useCallback(() => {
    if (!category) return;

    if (step === STEPS.PRICE) {
      console.log("form submmitted");
      listingModal.onClose();
      setStep(0);
      return;
    }
    onNext();
  }, [step, category]);

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
      case 0:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <h1>Which of these best describe your place</h1>
            <p>Pick a category</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {categories.map((item) => (
                <div
                  key={item.label}
                  className={`col-span-1 border-2 hover:border-black rounded-xl flex flex-col p-4 transition cursor-pointer ${
                    category === item.label && "border-black"
                  }`}
                  onClick={() => {
                    if (category === item.label) {
                      setCategory("");
                      return;
                    }
                    setCategory(item.label);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 1:
        bodyContent = (
          <>
            <p>select your location</p>
          </>
        );
        break;

      default:
        bodyContent = (
          <>
            <p>oops!</p>
          </>
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
