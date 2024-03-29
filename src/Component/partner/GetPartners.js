import React, { useEffect, useContext, useState,  } from "react";
import { makeStyles, Badge, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/Provider";
import PopUp from "../../utils/PopUp";
import { PartnerLogin } from "./PartnerLogin";
import { MdCancel } from "react-icons/md";
import Confirm from "../../utils/Confirm";
import { deletePartner } from "../../Context/actions/auth/Register";

const useStyles = makeStyles({
  links: {
    fontSize: 18,
    color: "#376e6f",
    fontFamily: "serif",
    textDecoration: "none",
    "&:hover": {
      color: "#DA7B93",
      borderRadius: 8,
    },
  },
  link2: {
    marginLeft: 8,
    textDecoration: "none",
    color: "#2f4454",
    padding: 4,
    borderRadius: 2,
    fontWeight: "bolder",
    "&:hover": {
      color: "#376e6f",
      borderRadius: 8,
    },
  },
  "@media (max-width: 960px)": {},
  "@media (max-width: 440px)": {},
});
export default function GetPartners({ item }) {
  const classes = useStyles();
  const { partnerName, partnerId, orgName, orgId } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    subject: "",
    title: "",
    subtitle: "",
  });
  const {
    loginState: {
      login: { logger },
    },
    loginpartnerState: {
      login: {  logger: partner, isPemmitted },
    },
    deletepartnerDispatch,
   
  } = useContext(GlobalContext);

  const onDelete = (id) => {
    deletePartner(id)(deletepartnerDispatch);
  };

  useEffect(() => {
    if (isPemmitted && partner?.message === "Login Successful") {
      setIsOpen(false);
    }
  }, [isPemmitted, partner]);
  const userId = logger?.user?.id;

  return (
    <>
      <ul
        style={{
          marginTop: 16,
          paddingLeft: 6,
          paddingRight: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {partnerId === userId ? (
          <Link
            to={`/institution/${orgName}/${orgId}`}
            className={classes.links}
          >
            {orgName}
          </Link>
        ) : (
          <Link
            to={`/institution/${partnerName}/${partnerId}`}
            className={classes.links}
          >
            {partnerName}
          </Link>
        )}

        <Link className={classes.link2}>
          {partnerId === userId ? (
            <em>
              {isPemmitted && partner?.response?.orgId === orgId ? (
                <Badge variant="dot" color="primary">
                  <em>On</em>
                </Badge>
              ) : (
                <em onClick={() => setIsOpen(true)}>Login</em>
              )}
            </em>
          ) : (
            ""
          )}
        </Link>
        {partnerId !== userId ? (
          <Link
            style={{
              display: "flex",
              justifyContent: "space-between",
              textDecoration: "none",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "4px important!",
            }}
          >
            <MdCancel
              style={{
                fontSize: 22,
                color: "#DA7B93",
                marginRight: "4px important!",
              }}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  subject: `${partnerName} (${partnerId})`,
                  title: "Are you sure you want to disengage this partner?",
                  subtitle: "This operation cannot be undone!",
                  onConfirm: () => {
                    const Ids = {
                      orgId,
                      partnerId,
                    };
                    onDelete(Ids);
                  },
                });
              }}
            />
          </Link>
        ) : (
          ""
        )}
      </ul>
      <PopUp openPopUp={isOpen} setOpenPopUp={setIsOpen} title={orgName}>
        <PartnerLogin orgId={orgId} userId={userId} />
      </PopUp>
      <Box>
        <Confirm
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
    </>
  );
}
