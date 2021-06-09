import React, { useState } from "react";
import { GroupButton } from "../../controls/Button";

import {
  makeStyles,
  Grid,
  Typography,
  Container,
  CardContent,
  Card,
} from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { SiMarketo, SiWhatsappn, SiExpertsexchange } from "react-icons/si";
import {
  GiLighthouse,
  GiSurroundedEye,
  GiSatelliteCommunication,
  GiFreedomDove,
} from "react-icons/gi";
import { HiOutlineChatAlt } from "react-icons/hi";
import { Title } from "../../controls/Input";
import Arts from "../courses/Arts";
import All from "../courses/All";
import Business from "../courses/Business";
import Design from "../courses/Design";
import Development from "../courses/Development";
import Holidays from "../courses/Holidays";
import Jamb from "../courses/Jamb";
import Science from "../courses/Science";
import Software from "../courses/Software";
import SSCE from "../courses/SSCE";
import WAEC from "../courses/WAEC";
import Marketing from "../courses/Marketing";
import Subjects from "../courses/Subjects";

const useStyles = makeStyles((theme) => ({}));

function CourseLinks() {
  function getContent(page) {
    switch (page) {
      case "All":
        return <All />;
      case "Software":
        return <Software />;
      case "Arts":
        return <Arts />;
      case "Business":
        return <Business />;
      case "Design":
        return <Design />;
      case "Development":
        return <Development />;
      case "Holidays":
        return <Holidays />;
      case "Jamb":
        return <Jamb />;
      case "Science":
        return <Science />;
      case "SSCE":
        return <SSCE />;
      case "WAEC":
        return <WAEC />;
        case "WAEC":
          return <Subjects />;
      case "Marketing":
        return <Marketing />;
      default:
        return "UNKNOWN STEP";
    }
  }
  const classes = useStyles();
  const [content, setContent] = useState("All");

  return (
    <Container>
      <Grid container>
        <Grid item md="2"></Grid>
        <Grid item md="8" style={{ marginTop: 36 }}>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              fontFamily: "serif",
              textAlign: "center",
              color: "#2f4454",
            }}
          >
            Our highest registered courses
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            style={{
              textAlign: "center",
              color: "#376e6f",
              letterSpacing: 2,
              margin: 10,
            }}
          >
            We have thousands of courses with topics carefully choosen by
            specialist in the field. These will help you pass your exams in
            flying colors.
          </Typography>
        </Grid>
        <Grid item md="2"></Grid>
      </Grid>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <GroupButton onClick={() => setContent("All")}>All</GroupButton>
        <GroupButton onClick={() => setContent("Software")}>
          IT & Software
        </GroupButton>
        <GroupButton onClick={() => setContent("Jamb")}>Jamb</GroupButton>
        <GroupButton onClick={() => setContent("SSCE")}>SSCE</GroupButton>
        <GroupButton onClick={() => setContent("Science")}>Science</GroupButton>
        <GroupButton onClick={() => setContent("Arts")}>Arts</GroupButton>
        <GroupButton onClick={() => setContent("WAEC")}>WAEC</GroupButton>
        <GroupButton onClick={() => setContent("Holidays")}>
          Holidays
        </GroupButton>
        <GroupButton onClick={() => setContent("Development")}>
          Development
        </GroupButton>
        <GroupButton onClick={() => setContent("Design")}>Design</GroupButton>
        <GroupButton onClick={() => setContent("Marketing")}>
          Marketing
        </GroupButton>
        <GroupButton onClick={() => setContent("Subjects")}>
         Subjects
        </GroupButton>
        <GroupButton onClick={() => setContent("Business")}>
          Business
        </GroupButton>
      </div>

      <div>{getContent(content)}</div>
    </Container>
  );
}

export default CourseLinks;