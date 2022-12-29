import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { default as React } from "react";
import CourseDetail from "../components/courseDetail";
import CourseTable from "../components/courseTable";

const mysql = require("mysql2");

export async function getServerSideProps(context) {
  const { blockId } = context.query;
  const username = "mmuster";

  const sqlQuery =
    "Select * from attendance INNER JOIN timetable ON attendance.block_id = timetable.block_id WHERE student_username = ? AND attendance.block_id=?";
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@UniKoeln123",
    port: 3306,
    database: "test_db",
  });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      }

      connection.query(
        sqlQuery,
        [username, blockId /* usr, matri */],
        (err, results, fields) => {
          if (err) {
            reject(err);
          }

          let dataString = JSON.stringify(results);
          let data = JSON.parse(dataString);
          resolve({
            props: {
              data,
            },
          });
        }
      );
    });
  });
}

export default function Home(props) {
  // TODO (backend): get actual values from database

  const router = useRouter();
  const { blockId } = router.query;
  const { selectedValue } = router.query;

  //code to secure the page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Laden</button>
      </div>
    );
  }
  //Redirect user back if unauthenticated or wrong user role
  if (status === "unauthenticated") {
    Router.push("/");
    return <p>Unauthenticated.Redirecting...</p>;
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }

  if (role === "D") {
    return (
      <CourseDetail
        type="lecturer"
        selectedValue={selectedValue}
        courseName={props.data[0].block_name}
        blockId={blockId}
      >
        <CourseTable
          blockId={blockId}
          data={props.data}
          type="lecturer"
        ></CourseTable>
      </CourseDetail>
    );
  } else if (role === "S") {
    return (
      <CourseDetail
        type="student"
        blockId={blockId}
        courseName={props.data[0].block_name}
      >
        <CourseTable
          blockId={blockId}
          data={props.data}
          type="student"
        ></CourseTable>
      </CourseDetail>
    );
  } else if (role === "B" || role === "A") {
    return (
      <CourseDetail
        type="admin"
        blockId={blockId}
        courseName={props.data[0].block_name}
        selectedValue={selectedValue}
      >
        <CourseTable
          blockId={blockId}
          data={props.data}
          type="admin"
        ></CourseTable>
      </CourseDetail>
    );
  }
}
