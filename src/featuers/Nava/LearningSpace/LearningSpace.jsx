import { useState } from "react";
import styles from "./LearningSpace.module.css";

function LearningSpace() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lessonContent, setLessonContent] = useState("");

  const openPopUp = () => setIsPopupOpen(true);
  const closePopUp = () => {
    setIsPopupOpen(false);
    console.log("תוכן השיעור שנשמר:", lessonContent);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        <div className={styles.cameraBox}>📷 שידור המורה</div>
      </div>

      <div className={styles.buttonsHeader}>
        <button className={styles.mainButton}>🎥 התחלת הקלטה</button>
        <button className={styles.mainButton}>🖥️ שיתוף מסך</button>
        <button className={styles.mainButton}>👨‍🎓 שיתוף מסך תלמיד</button>
        <button className={styles.mainButton} onClick={openPopUp}>
          💾 שמור תוכן שיעור
        </button>
      </div>

      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>הזן תוכן שיעור</h2>
            <textarea
              className={styles.textArea}
              value={lessonContent}
              onChange={(e) => setLessonContent(e.target.value)}
              placeholder="כתוב כאן את תוכן השיעור..."
            />
            <button className={styles.saveButton} onClick={closePopUp}>
              שמור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningSpace;
