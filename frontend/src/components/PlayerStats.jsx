import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton"

// import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function PlayerStats({ playerStats, communityStats, edit} ) {
    // console.log(playerStats, communityStats)
    const stats = ["Shooting", "Handle", "Perimiter Defense",
        "Interior Defence", "Rebounding", "Steals", "Blocks", "Court IQ", "Leadership"]

    return (
        <div>
            <TableContainer /*component={Paper}*/>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ability</StyledTableCell>
                            <StyledTableCell align="right">Personal</StyledTableCell>
                            <StyledTableCell align="right">Community</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(playerStats).map((keyname, i) => (
                            <StyledTableRow key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">
                                    {stats[i]}
                                </StyledTableCell>
                                <StyledTableCell align="right">{playerStats[keyname]}</StyledTableCell>
                                <StyledTableCell align="right">{communityStats[keyname]}</StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <Button style={{ float: "right", width:115, color:"black" }} variant="contained" endIcon={<EditIcon />} onClick={edit}>Edit</Button>
        </div>
    )
}

