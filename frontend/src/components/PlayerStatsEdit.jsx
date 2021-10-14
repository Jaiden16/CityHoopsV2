import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CancelIcon from '@mui/icons-material/Cancel';
import PublishIcon from '@mui/icons-material/Publish';
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

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


export default function PlayerStatsEdit({ playerStats, edit }) {
    // console.log(playerStats, communityStats)
    const stats = ["Shooting", "Handle", "Perimiter Defense",
        "Interior Defence", "Rebounding", "Steals", "Blocks", "Court IQ", "Leadership"]
    let [statsValue, setStatsValue] = useState({
        shooting: 1,
        handle: 1,
        perimiter_defence: 1,
        interior_defence: 1,
        rebounding: 1,
        steals: 1,
        blocks: 1,
        iq: 1,
        leadership: 1
    })

    console.log(playerStats)

    const handleChange = (e) => {
        console.log("value change", e.target.value)
        if (e.target.value > 0) {
            setStatsValue({
                ...statsValue, [e.target.name]: parseInt(e.target.value)
            })
        }
        console.log("change function", statsValue)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log("submit")
        edit()
    }


    const value = [1, 2, 3, 4, 5]

    let key = Object.keys(statsValue)
    console.log("key variable", statsValue)

    return (
        <form onSubmit={handleSubmit}>
            <TableContainer /*component={Paper}*/>
                <Table sx={{ width: "100%" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ability</StyledTableCell>
                            <StyledTableCell align="left">Stat</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.map((keyname, i) => (
                            <StyledTableRow key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">
                                    {stats[i]}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <select id={keyname} onClick={(e) => { console.log("target name", e) }} name={key[i]} onChange={handleChange} /*value={statsValue[keyname]}*/>
                                        <option value={0}>Select Rating</option>
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
            <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                <Button style={{ float: "right", width:115 }} variant="contained" endIcon={<PublishIcon />} type="submit">Send</Button>
                <Button style={{ float: "right", width:115 }} variant="contained" endIcon={<CancelIcon />} onClick={edit}>Cancel</Button>
            </Stack>


            {/* <IconButton style={{ float: "right" }} color="primary" aria-label="upload picture" component="span" onClick={edit}>
                Cancel  <CancelIcon />
            </IconButton> */}
            {/* <IconButton style={{ float: "right" }} color="primary" aria-label="upload picture" component="span" onClick={edit}>
                Submit <PublishIcon />
            </IconButton> */}
        </form>
    )
}

