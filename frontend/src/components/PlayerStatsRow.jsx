import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

export default function Row({ index, stats,keyname,value,func }) {
    return (
        <StyledTableRow key={stats[index]}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <StyledTableCell component="th" scope="row">
                {stats[index]}
            </StyledTableCell>
            <StyledTableCell align="right">
                <select id={keyname} name={keyname} onChange={func} value={keyname}>
                    <option>Select Rating</option>
                    {value.map((el, ind) => {
                        return (
                            <option key={ind} value={el}>{el}</option>
                        )


                    })}
                </select>
            </StyledTableCell>


        </StyledTableRow>

    )

}


