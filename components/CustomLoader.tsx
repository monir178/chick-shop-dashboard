import styles from "./Loader.module.css";

const CustomLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
};

export default CustomLoader;
