import { useState } from "react";
import supabase from "../services/supaBaseConnector";
import { useUserStore } from "../store/userStore";
import { Button } from "@mui/material";

const ConfirmResetProgress = () => {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    const clearFavorites = async () => {
      const { error } = await supabase
        .from("userData")
        .update({ progress: null })
        .eq("user_id", user);
    };
    clearFavorites();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        Clear listening progress?
      </Button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you would like to reset your listening progress?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmResetProgress;
