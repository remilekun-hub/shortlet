import { ReactElement, useEffect, useCallback, useState } from "react";
import Button from "../Button";

interface ModalProp {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}: ModalProp) {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 flex justify-center items-center z-[50000]`}
      >
        <div className="relative w-full md:w-4/6 lg:3/6 xl:w-2/5 mx-auto h-full md:h-auto">
          {/* content */}
          <div
            className={`transition duration-300 ease-linear h-full ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white">
              {/* header */}
              <div className="flex justify-center relative p-5 rounded-t border-b-[1px] border-black/10">
                <button
                  className="absolute left-5 bottom-auto"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-neutral-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="font-semibold">{title}</h2>
              </div>
              {/* body*/}
              <div className="flex-auto relative px-6 pt-7 pb-2">{body}</div>
              <footer className="flex flex-col gap-3 pt-2 p-6">
                <div className=" flex flex-row items-center gap-4 w-full">
                  {secondaryLabel && secondaryAction && (
                    <Button
                      label={secondaryLabel}
                      onSubmit={secondaryAction}
                      secondary
                    />
                  )}
                  <Button label={actionLabel} onSubmit={handleSubmit} />
                </div>
                {footer}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
