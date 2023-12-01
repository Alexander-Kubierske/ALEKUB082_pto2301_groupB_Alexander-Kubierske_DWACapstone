import { useState } from "react";
import supabase from "../services/supaBaseConnector";
import { useUserStore } from "../store/userStore";
import { Button } from "@mui/material";

const ConfirmResetProgress = () => {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async () => {
    const clearFavorites = async () => {
      try {
        const { error } = await supabase
          .from("userData")
          .update({ progress: null })
          .eq("user_id", user);

        if (error) {
          console.error("Error clearing favorites:", error.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Unexpected error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    await clearFavorites();
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
