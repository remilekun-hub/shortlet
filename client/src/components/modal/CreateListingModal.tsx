import Modal from "./Modal";
import useListingModalState from "../../zustand/listingModal";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { categories } from "../../data/categories";
import Heading from "../Heading";
import { Select } from "@mantine/core";
import Counter from "../Counter";
import { imageUpload } from "../../util/imageUpload";
import { userSlice } from "../../zustand/user";
import axios from "axios";

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
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState(false);
  const user = userSlice((state) => state.user);
  const [data, setData] = useState({
    category: "",
    title: "",
    description: "",
    country: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    bed: 1,
    city: "",
    price: 1,
  });

  console.log({ data });

  const handleSubmit = async () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    if (
      !data.bathrooms ||
      !data.bedrooms ||
      !data.bed ||
      !data.category ||
      !data.city ||
      !data.description ||
      !data.guests ||
      !data.country ||
      !data.title ||
      !data.price
    ) {
      setError(true);
      setTimeout(() => setError(false), 5000);
      return;
    }
    setIsLoading(true);
    console.log("submitted");

    try {
      const cloudImages = await imageUpload(files);
      const res = await axios.post(
        "http://localhost:5000/api/v1/properties",
        {
          ...data,
          images: cloudImages,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setData({
        category: "",
        title: "",
        description: "",
        country: "",
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
        bed: 1,
        city: "",
        price: 1,
      });
      setFiles(null);
    }
    // call
  };

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
              placeholder="Country"
              searchable
              mt={20}
              size="md"
              defaultValue={data.country}
              nothingFound="No options"
              onSearchChange={(value) => setData({ ...data, country: value })}
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
            <hr />
            <input
              type="text"
              name="city"
              placeholder="City e.g Victoria Island, Lagos"
              value={data.city}
              className="mt-5 w-full outline-none border-[1.5px] border-black/20 p-2 px-3 rounded-[4px] text-neutral-700 transition hover:border-black focus:border-black"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </>
        );
        break;
      case 2:
        bodyContent = (
          <div className="flex flex-col gap-6">
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
              title="Beds"
              subtitle="How many beds do you have?"
              value={data.bed}
              onChange={(value: number) => setData({ ...data, bed: value })}
            />
            <hr />
            <Counter
              title="Bedrooms"
              subtitle="How many bedrooms do you have?"
              value={data.bedrooms}
              onChange={(value: number) =>
                setData({ ...data, bedrooms: value })
              }
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
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
        );
        break;

      case 4:
        bodyContent = (
          <div className="flex flex-col gap-6">
            <Heading
              title="how would you describe your place?"
              subtitle="short and sweet works best"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={data.title}
              className="outline-none border-[1.5px] border-black/20 p-2 px-3 rounded-[4px] text-neutral-700 transition hover:border-black focus:border-black"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
            <hr />

            <textarea
              rows={5}
              name="description"
              value={data.description}
              placeholder="Description"
              className="resize-none outline-none border-[1.5px] border-black/20 p-2 px-3 rounded-[4px] text-neutral-700 transition hover:border-black focus:border-black"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
        );
        break;

      case 5:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night in USD?"
            />
            <input
              type="number"
              name="price"
              placeholder="$ Price Per Night "
              value={data.price}
              className="outline-none border-[1.5px] border-black/20 p-2 px-3 rounded-[4px] text-neutral-700 transition hover:border-black focus:border-black"
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
            />

            {error && (
              <p className="text-red-700 text-center">
                All fields must be filled!
              </p>
            )}
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
