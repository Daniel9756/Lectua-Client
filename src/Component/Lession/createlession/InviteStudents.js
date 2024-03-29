import InviteStudentDataTable from "../InviteStudentDataTable";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import {
  makeStyles,
  withStyles,
  CircularProgress,
  Box,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { GoDiffAdded, GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";
import MessageBox from "../../../utils/Alert";
import { LabelText, Title } from "../../../controls/Input";
import { GlobalContext } from "../../../Context/Provider";
import { getLecturesByATeacher } from "../../../Context/actions/lesson/lesson";
import SessionDataTable from "../SessionDataTable";
import { AiFillDingtalkSquare } from "react-icons/ai";
import { CustomCheckbox } from "../../../controls/Checkbox";

const useStyles = makeStyles({
  root: {
    borderTop: "1px solid #2f4454",
  },
  table: {
    height: "100px",
    // width: "90%",
  },
  thd: {
    fontFamily: "serif",
    fontWeight: "bold",
  },
  title: {
    padding: 5,
    paddingLeft: 15,
    paddingBottom: 4,
    fontWeight: "bolder",
    letterSpacing: 2,
  },
  body: {
    overflowY: "scroll",
    minHeight: "100px",
  },

  "@media (max-width: 960px)": {},
  "@media (max-width: 440px)": {},
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
    fontSize: 15,
    textTransform: "capitalize",
    boxShadow: 0,
    border: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#2f4454",
    height: "100px",
    border: "none",
  },
}))(TableRow);

function InviteStudent({ handleNext, handleBack }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState([]);

  const [mycourses, setMycourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log(mycourses)
  const token = localStorage.getItem("token");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5500/lectures/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((data) => setMycourses(data?.data))
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);
  const handelboxcheck = () => {
    setChecked(true);
  };
  // useEffect(() => {
  //   const info = mycourses?.reduce((accumulator, curr) => {
  //     const { subject } = curr;
  //     return {
  //       ...accumulator,
  //       [subject]: (accumulator[subject] || 0) + 1,
  //     };
  //   }, {});
  //   // setResult(info);
  //   console.log(info, 'info')
  // }, [mycourses, setResult]);

  console.log(result, "results");

  return (
    <>
      <TableContainer>
        <div>
          {loading && <CircularProgress />}
          {!loading && mycourses?.response?.length === 0 && (
            <MessageBox message="No data fetched" severity="error" />
          )}
          {!loading && mycourses?.response?.length > 0 && (
            <MessageBox message={mycourses?.message} severity="success" />
          )}
        </div>
        <div>
          <Table
            className={classes.table}
            aria-label="sticky table"
            size="medium"
            padding="checkbox"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">
                  <Title style={{ color: "#DA7B93", fontFamily: "serif" }}>
                    Your COURses
                  </Title>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody className={classes.body}>
              {!loading && mycourses?.response?.length > 0 &&
                mycourses?.response?.map((item) => (
                  <InviteStudentDataTable item={item} />
                ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </>
  );
}

export default InviteStudent;
