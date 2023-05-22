import { userSlice } from "../zustand/user";
import { ReviewProp } from "../typings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Review({
  createdBy,
  _id,
  name,
  message,
  image,
  propertyId,
}: ReviewProp) {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();

  const deleteReview = async () => {
    if (user) {
      await axios
        .delete(
          `http://localhost:5000/api/v1/properties/${propertyId}/review/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => navigate(0));
    }
  };

  return (
    <div className=" flex flex-col mb-3">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={`${name}'s image`}
          className="h-11 w-11 rounded-full object-cover object-center"
          loading="lazy"
        />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="font-medium text-neutral-500 text-[14px]">
            April 2023
          </div>
        </div>
      </div>
      <p className="mt-4 text-neutral-700">{message}</p>
      {createdBy === user?.id && (
        <div
          className="ml-auto cursor-pointer hover:bg-neutral-200 p-2 flex items-center justify-center rounded-full"
          onClick={deleteReview}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Review;
