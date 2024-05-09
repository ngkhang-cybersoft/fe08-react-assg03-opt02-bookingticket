import * as bootstrap from "bootstrap";
const { Toast } = bootstrap;

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ToastContainer = () => {
  const refToast = useRef();
  const { toast } = useSelector((state) => state.rdcToast);

  useEffect(() => {
    let myToast = refToast.current;
    let bsToast = bootstrap.Toast.getInstance(myToast);
    bsToast = new Toast(myToast, { delay: 4000 });
    toast.isShow ? bsToast.show() : bsToast.hide();

    myToast.addEventListener("hidden.bs.toast", () => {
      if (toast.isSuccess && toast.handleDirect) toast.handleDirect();
    });
  }, [toast]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div ref={refToast} className={`toast ${toast.className}`}>
        <div className="toast-header">
          <img src="/vite.svg" className="rounded me-2" alt="..." />
          <strong className="me-auto">{toast.content.title}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{toast.content.message}</div>
      </div>
    </div>
  );
};

export default ToastContainer;
