import Image from "next/image";
import styles from "./page.module.css";
import Home1 from "@/Components/Home";
// import AdminNavbar from "@/Components/AdminNavbar";
// import Front from "@/Components/Front";
// import AdminNavbar from "@/Components/AdminNavbar";

export default function Home() {
  return (
    <div className={styles.page}>
{/* <AdminNavbar/>
  <Front/> */}
  <Home1/>
  

    </div>
  );
}
