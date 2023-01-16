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
    if (role == "S") {
      identifier = session.user.attributes.description.slice(1); //removes first letter before matrikelnummer
    } else {
      identifier = session.user.attributes.mail; //removes first letter before matrikelnummer
    }
  } catch {
    try {
      role = session.user.account_role; //Plug any desired attribute behind user.
      identifier = session.user.email; //Plug any desired attribute behind user.
    } catch {}
  }

  //Define sql query depending on role
  let sqlQuery = "";
  if (role === "B") {
    //Show sessions where lecturer is assigned and given group nr
    sqlQuery =
      "SELECT * FROM blocks INNER JOIN sessions ON blocks.block_id = sessions.block_id WHERE lecturer_id = ? AND sessions.group_id = " +
      groupId.slice(7) +
      ";";
  } else if (role === "S") {
    //Show sessions where the student is assigned
    sqlQuery =
      "Select *,blocks.block_id, blocks.block_name from attendance INNER JOIN sessions ON attendance.sess_id = sessions.sess_id AND attendance.group_id = sessions.group_id AND attendance.block_id = sessions.block_id INNER JOIN blocks ON sessions.block_id = blocks.block_id WHERE attendance.matrikelnummer=?";
  } else if (role === "scidaSekretariat" || role === "scidaDekanat") {
    //Show alls sessions given block and group nr
    sqlQuery =
      "SELECT DISTINCT sessions.group_id, sessions.sess_start_time, sessions.sess_end_time, sessions.sess_type, sessions.lecturer_id, blocks.block_name, blocks.block_id, sessions.sess_id  FROM csv INNER JOIN blocks ON blocks.block_name = csv.block_name INNER JOIN sessions ON sessions.block_id = blocks.block_id WHERE blocks.block_id = " +
      blockId +
      ";";
  }
  if (sqlQuery != "" && role != "" && identifier != "") {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "@UniKoeln123",
      port: 3306,
      database: "test_db",
      timezone: "+00:00", //Use same timezone as in mysql database
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
  //console.log(props);
  const router = useRouter();
  const { blockId } = router.query;
  const { selectedValue } = router.query;
  const { course } = router.query;

  //code to secure the page
  const { data: session, status } = useSession();
  let identifier = "";
  let matrikel = "";
  try {
    identifier = session.user.attributes.uid;
    matrikel = session.user.attributes.description.slice(1);
  } catch {}
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
  if (role === "B") {
    return (
      <CourseDetail
        type="lecturer"
        groupId={selectedValue}
        courseName={props.data[0].block_name}
        blockId={blockId}
      >
        <CourseTable
          group_id={selectedValue}
          blockId={blockId}
          data={props.data}
          type="lecturer"
        ></CourseTable>
      </CourseDetail>
    );
  } else if (role === "S") {
    return (
      <CourseDetail type="student" blockId={blockId} courseName={course}>
        <CourseTable
          groupId={selectedValue}
          blockId={blockId}
          data={props.data}
          block_name={course}
          matrikel={matrikel}
          type="student"
        ></CourseTable>
      </CourseDetail>
    );
  } else if (role === "scidaSekretariat" || role === "scidaDekanat") {
    //console.log(props.data);
    return (
      <CourseDetail
        type="admin"
        blockId={blockId}
        courseName={
          props.data[0] ? props.data[0].block_name : "Keine Daten vorhanden"
        }
        data={props.data}
      ></CourseDetail>
    );
  }
}
