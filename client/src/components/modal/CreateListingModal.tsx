import Modal from "./Modal";
import useListingModalState from "../../zustand/listingModal";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { TextInput } from "@mantine/core";
import { categories } from "../../data/categories";
import Heading from "../Heading";
import { Select } from "@mantine/core";
import Counter from "../Counter";

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
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");

  const [data, setData] = useState({
    category: "",
    location: "",
    guests: 1,
    rooms: 1,
    bathrooms: 1,
  });

  const handleSubmit = useCallback(() => {
    if (!data.category) return;

    // if (step === STEPS.PRICE) {
    //   console.log("form submmitted");
    //   listingModal.onClose();
    //   setStep(0);
    //   return;
    // }
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    // call axios
  }, [step]);

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
  }, [step, data.category]);

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
            <Heading
              title="Which of these best describe your place"
              subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {categories.map((item) => (
                <div
                  key={item.label}
                  className={`col-span-1 border-2 hover:border-black rounded-xl flex flex-col p-4 transition cursor-pointer ${
                    data.category === item.label && "border-black"
                  }`}
                  onClick={() => {
                    if (data.category === item.label) {
                      setData({ ...data, category: "" });
                      return;
                    }
                    setData({ ...data, category: item.label });
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
            <Heading
              title="Where is your place located ?"
              subtitle="Help guests find you"
            />
            <Select
              placeholder="Anywhere"
              searchable
              mt={20}
              size="md"
              defaultValue={location}
              nothingFound="No options"
              searchValue={location}
              onSearchChange={setLocation}
              transitionProps={{
                transition: "pop",
                duration: 80,
                timingFunction: "ease",
              }}
              data={[
                "Nigeria",
                "USA",
                "Germany",
                "Ghana",
                "Spain",
                "Uk",
                "Japan",
                "Canada",
              ]}
            />
          </>
        );
        break;
      case 2:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place"
              subtitle="what amenities do you have?"
            />
            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              value={data.guests}
              onChange={(value: number) => setData({ ...data, guests: value })}
            />
            <hr />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              value={data.rooms}
              onChange={(value: number) => setData({ ...data, rooms: value })}
            />
            <hr />
            <Counter
              title="Bathroom"
              subtitle="How many bathrooms do you have?"
              value={data.bathrooms}
              onChange={(value: number) =>
                setData({ ...data, bathrooms: value })
              }
            />
          </div>
        );
        break;
      case 3:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your place"
              subtitle="show guests what your place looks like"
            />
            <input
              type="file"
              name="upload"
              id=""
              multiple
              formEncType="multipart/form-data"
              typeof="image"
              onChange={(e) => console.log(e.target.files)}
            />
          </div>
        );
        break;

      case 4:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="how would you describe your place?"
              subtitle="short and sweet works best"
            />
            <TextInput
              placeholder="Title"
              // {...form.getInputProps("email")}
              mb={10}
              autoComplete="no"
              size="md"
            />
            <hr />
            <input type="text" name="" id="" placeholder="description" />
          </div>
        );
        break;

      case 5:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night?"
            />
          </div>
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
