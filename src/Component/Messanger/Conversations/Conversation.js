import { makeStyles, Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    alignItems: "center",
    cursor: 'pointer',
    padding: 4,
    "&:hover": {
      backgroundColor: "#dcdde1",
    },
  },
}));

function Conversation({ friends, setTutor, setLeaner }) {
  const classes = useStyles();

//   console.log(friends);
  const { picsUrl, orgName, studentName, plan, specialty } = friends;


  return (
    <>
      <hr style={{ margin: 0, opacity: '0.1' }} />
      <Box>
        <Box className={classes.list}>
          <Avatar
            style={{ width: 35, height: 35, background: "#2f4454" }}
            src={picsUrl}
          ></Avatar>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <em
              style={{ fontWeight: "bold", color: "#376e6f", marginLeft: 12 }}
            >
              {orgName ? orgName : studentName}
            </em>
            <small style={{ marginLeft: 12 }}>
              {plan ? plan : specialty}
            </small>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Conversation;
