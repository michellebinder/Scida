import { useSession, getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { default as React } from "react";
import CourseDetail from "../components/courseDetail";
import CourseTable from "../components/courseTable";

const mysql = require("mysql2");

export async function getServerSideProps({ req, query }) {
  const blockId = query.blockId;
  const groupId = query.selectedValue;

  //Try recieving correct user role and information
  const session = await getSession({ req });
  let role = "";
  let identifier = "";
  //Try catch is needed, otherwise it will fail if either of the sessions is null
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus; //Plug any desired attribute behind attributes.
    identifier = session.user.attributes.uid; //description.slice(1); //removes first letter before matrikelnummer
    //identifier = "mmuster";
  } catch {
    try {
      role = session.user.account_role; //Plug any desired attribute behind user.
      identifier = session.user.email; //Plug any desired attribute behind user.
      identifier = "admin2@admin";
    } catch {}
  }

  //Define sql query depending on role
  let sqlQuery = "";
  if (role === "D") {
    //Show sessions where lecturer is assigned and given group nr
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN timetable ON blocks.block_id = timetable.block_id WHERE lecturer_id = ? AND blocks.group_id = " +
      groupId.slice(7) +
      ";";
  } else if (role === "S") {
    //Show sessions where the student is assigned
    sqlQuery =
      "Select *,blocks.block_id from attendance INNER JOIN timetable ON attendance.block_id = timetable.block_id INNER JOIN blocks ON timetable.block_id = blocks.block_id WHERE attendance.student_username=?";
  } else if (role === "B" || role === "A") {
    //Show alls sessions given block and group nr
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN timetable ON blocks.block_id = timetable.block_id WHERE blocks.block_id = " +
      blockId +
      " AND group_id = " +
      groupId.slice(7) +
      ";";
  }
  if (sqlQuery != "" && role != "" && identifier != "") {
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

        connection.query(sqlQuery, [identifier], (err, results, fields) => {
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
        });
      });
    });
  } else {
    return { props: { data: "FAIL 7" } };
  }
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
  //Redirect user back if unAUTHENTICATED (logged out)
  if (status === "unauthenticated") {
    Router.push("/");
    return (
      <div className="grid h-screen justify-center place-items-center ">
        <button className="btn loading">Ausloggen</button>
      </div>
    );
  }

  //Try recieving correct user role
  var role;
  try {
    //Try ldap, if not existent do catch with local accounts
    role = session.user.attributes.UniColognePersonStatus;
  } catch {
    role = session.user.account_role;
  }
  if (props.data.length > 0) {
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
          blockId={props.data[0].block_id}
          courseName={props.data[0].block_name}
        >
          <CourseTable
            blockId={props.data[0].block_id}
            data={props.data}
            block_name={props.data[0].name}
            type="student"
          ></CourseTable>
        </CourseDetail>
      );
    } else if (role === "B" || role === "A") {
      return (
        <CourseDetail
          type="admin"
          blockId={props.data[0].block_id}
          courseName={props.data[0].block_name}
          selectedValue={selectedValue}
        >
          <CourseTable
            blockId={blockId}
            groupId={selectedValue}
            blockName={props.data[0].block_name}
            data={props.data}
            type="admin"
          ></CourseTable>
        </CourseDetail>
      );
    }
  } else {
    return <p>Keine Daten vorhanden</p>;
  }
}
