import styles from "./styles.module.css";

function Login(isIn) {
  const googleAuth = () => {
    window.open(`http://localhost:8080/api/v1/auth/google/callback`, "_self");
  };
  
  return (
    <div className={styles.container}>
      <button className={styles.google_btn} onClick={googleAuth}>
        <span>Sign {isIn.isIn} with Google</span>
      </button>
    </div>
  );
}

export default Login;
