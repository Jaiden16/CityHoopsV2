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


export default function PlayerStatsEdit(/*{ playerStats, communityStats }*/) {
    // console.log(playerStats, communityStats)
    const stats = ["Shooting", "Handle", "Perimiter Defense",
        "Interior Defence", "Rebounding", "Steals", "Blocks", "Court IQ", "Leadership"]
    let [statsValue, setStatsValue] = useState({
        shoot: 1,
        handle: 1,
        perimiter_d: 1,
        int_d: 1,
        reb: 1,
        stl: 1,
        blk: 1,
        iq: 1,
        ldr: 1
    })

    const handleChange = (e) => {
        setStatsValue({...statsValue, [e.target.name]: parseInt(e.target.value)
        })
        console.log("change function",statsValue)
    }

    const value = [1, 2, 3, 4, 5]

    let key = Object.keys(statsValue)
    console.log("key variable", statsValue)

    return (
        <form>
            <TableContainer /*component={Paper}*/>
                <Table sx={{ width: "70%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ability</StyledTableCell>
                            <StyledTableCell align="right">Personal</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.map((keyname, i) => (
                            <StyledTableRow key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">
                                    {stats[i]}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <select id={keyname} onClick={(e) => { console.log("target name", e.target.name) }} name={key[i]} onChange={handleChange} value={statsValue[keyname]}>
                                        <option disabled>Select Rating</option>
                                        {value.map((el, ind) => {
                                            return (
                                                <option key={ind} value={el}>{el}</option>
                                            )


                                        })}
                                    </select>
                                </StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </form>
    )
}

