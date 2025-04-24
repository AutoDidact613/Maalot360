import { useState } from "react";
import styles from "./LearningSpace.module.css";

function LearningSpace() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lessonContent, setLessonContent] = useState("");

  const openPopUp = () => {
    setIsPopupOpen(true);
  };

  const closePopUp = () => {
    setIsPopupOpen(false);
    console.log("תוכן השיעור שנשמר:", lessonContent); // ניתן לשמור זאת במיקום אחר
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonsHeader}>
        <button className={styles.mainButton}>שיתוף מסך</button>
        <button className={styles.mainButton}>שיתוף מסך תלמיד</button>
        <button className={styles.mainButton}>התחל הקלטה</button>

        <div className={styles.smallButtons}>
          <button className={styles.smallButton}>המשך</button>
          <button className={styles.smallButton}>השהה</button>
          <button className={styles.smallButton} onClick={openPopUp}>
            שמירה
          </button>
        </div>
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
