import React, { useState, useContext, useEffect } from "react";

import {
    TableCell,
    TableRow,
    makeStyles,
    Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MdCancel, MdEdit } from "react-icons/md";
import PopUp from "../../utils/PopUp";

import Confirm from "../../utils/Confirm";
import { deleteASubject } from "../../Context/actions/lesson/lesson"
import { GlobalContext } from "../../Context/Provider";
import Subject from "../user/edit/Subject";

const useStyles = makeStyles({
    tablehead: {
        textTransform: "uppercase", border: "none", fontWeight: "bold", opacity: 0.7, color: "#376e6f"
    },
    "@media (max-width: 960px)": {

    },
    "@media (max-width: 440px)": {

    },
});
function SubjectDataTable({ item }) {
    const CustomTableRow = withStyles((theme) => ({
        root: {
            backgroundColor: "#f1f2f6",
            borderTop: "5px solid white",
            borderRadius: "50px",
            paddingRight: 14,
            paddingLeft: 14,
        },
    }))(TableRow);
    // deleteASubject
    const { id, subject, price, per, target, createdat, teacher, creator, owner } = item
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const {
        deleteSubjectDispatch,
        deleteSubjectState: {
            subject: { isDeleted },
        },
        loginState: {
            login: { isLoggin, logger, isPemmitted },
          },
    } = useContext(GlobalContext);
    const userID = logger?.userID
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        subject,
        title: "",
        subtitle: "",
    });

    useEffect(() => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });

    }, [isDeleted]);


    const onDelete = (id) => {
        deleteASubject(id)(deleteSubjectDispatch)
    }
    return (
        <>
            <CustomTableRow
                key={item.id}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <TableCell
                    align="left"
                    className={classes.tablehead}

                >
                    {id}
                </TableCell>
                <TableCell align="left" className={classes.tablehead}>
                    {subject}
                </TableCell>
                <TableCell align="center" className={classes.tablehead}>
                    {(teacher === null || creator === userID) ? "OWNER" : teacher}
                </TableCell>
                <TableCell align="right" className={classes.tablehead}>
                    {price}
                </TableCell>
                <TableCell align="right" className={classes.tablehead}>
                    {per}
                </TableCell>

                <TableCell align="right" className={classes.tablehead}>
                    {target}
                </TableCell>
                <TableCell align="right" className={classes.tablehead}>
                    {createdat}
                </TableCell>

                <TableCell align="right" className={classes.tablehead}>
                    <Box style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", fontWeight: "bold", cursor: "pointer"
                    }}>

                        <MdEdit style={{
                            fontWeight: "bold", fontSize: 35, marginRight: 8, cursor: "pointer", color: "#DA7B93"
                        }} onClick={() => {
                            setIsOpen(true);

                        }} />
                        <MdCancel style={{ fontWeight: "bold", fontSize: 32, cursor: "pointer", color: "#DA7B93" }} onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                subject: `${subject} (${id})`,
                                title: "Are you sure you want to delete this subject?",
                                subtitle: "This operation cannot be undone!",
                                onConfirm: () => {
                                    onDelete(id);
                                },
                            });
                        }} />
                    </Box>
                </TableCell>
            </CustomTableRow>
            <Box>
                <Confirm
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Box>
            <Box>
                <PopUp
                    openPopUp={isOpen}
                    setOpenPopUp={setIsOpen}
                    title={`${subject} (${id})`}
                >
                    <Subject
                        item={item}
                        setOpenPopUp={setIsOpen}
                    />
                </PopUp>
            </Box>
        </>
    );
}

export default SubjectDataTable;