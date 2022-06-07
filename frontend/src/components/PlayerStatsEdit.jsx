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
import { orange, red } from "@mui/material/colors"
import axios from "axios";
import {apiUrl} from "../util/util"

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

const RedColorButton = styled(Button)(({ theme }) => ({
    /*color: theme.palette.getContrastText(grey[900]),*/
    // color: "white-smoke",
    backgroundColor: red["A700"],
    '&:hover': {
        backgroundColor: red[600],
    },
}));

const API = apiUrl();

export default function PlayerStatsEdit({ playerStats, edit, usernum,func }) {
    // console.log(playerStats, communityStats)
    const stats = ["Shooting", "Handle", "Perimiter Defense",
        "Interior Defence", "Rebounding", "Steals", "Blocks", "Court IQ", "Leadership"]
    let [statsValue, setStatsValue] = useState({
        shooting: 3,
        handle: 3,
        perimiter_defence: 3,
        interior_defence: 3,
        rebounding: 3,
        steals: 3,
        blocks: 3,
        iq: 3,
        leadership: 3
    })

    let currentStatsValue = {
        shooting: playerStats.shooting,
        handle: playerStats.handle,
        perimiter_defence: playerStats.perimiter_defence,
        interior_defence: playerStats.interior_defence,
        rebounding: playerStats.rebounding,
        steals: playerStats.rebounding,
        blocks: playerStats.blocks,
        iq: playerStats.iq,
        leadership: playerStats.leadership
    }

    // console.log("current stats", currentStatsValue)

    const handleChange = (e) => {
        console.log("value change", e.target.value)
        if (e.target.value > 0) {
            setStatsValue({
                ...statsValue, [e.target.name]: e.target.value
            })
        }
        // console.log("change function", statsValue)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit")
        let updatedStats = {}
        if(currentStatsValue.shooting !== statsValue.shooting){
            console.log("shooting")
            updatedStats.shooting = statsValue.shooting
        }
        if(currentStatsValue.handle !== statsValue.handle){
            console.log("handle")
            updatedStats.handle = statsValue.handle
        }
        if(currentStatsValue.perimiter_defence !== statsValue.perimiter_defence){
            console.log("perimiter d")
            updatedStats.perimiter_defence = statsValue.perimiter_defence
        }
        if(currentStatsValue.interior_defence !== statsValue.interior_defence){
            console.log("int d")
            updatedStats.interior_defence = statsValue.interior_defence
        }
        if(currentStatsValue.rebounding !== statsValue.rebounding){
            console.log("reb")
            updatedStats.rebounding = statsValue.rebounding
        }
        if(currentStatsValue.steals !== statsValue.steals){
            console.log("steals")
            updatedStats.steals = statsValue.steals
        }
        if(currentStatsValue.blocks !== statsValue.blocks){
            console.log("blocks")
            updatedStats.blocks = statsValue.blocks
        }
        if(currentStatsValue.iq !== statsValue.iq){
            console.log("iq")
            updatedStats.iq = statsValue.iq
        }
        if(currentStatsValue.leadership !== statsValue.leadership){
            console.log("leadership")
            updatedStats.leadership = statsValue.leadership
        }
        if(usernum){
            try{
                let url =`${API}/api/skills/${usernum}`
                let patch = await axios.patch(url,updatedStats)
                console.log("stat object",updatedStats)
                // console.log("try",url)
    
            }catch(err){
                console.log(err)
            }

        }
        func()
        
        edit()
    }


    const value = [1, 2, 3, 4, 5]

    let key = Object.keys(statsValue)
    // console.log("key variable", statsValue)
    // console.log("usernumber", usernum)

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
                                        <option value={0}>Select Time</option>
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
                <Button style={{ float: "right", width: 115, color: "black" }} variant="contained" endIcon={<PublishIcon />} type="submit">Send</Button>
                <RedColorButton style={{ float: "right", width: 115, color: "black", fontWeight: 550 }} variant="contained" endIcon={<CancelIcon />} onClick={edit}>Cancel</RedColorButton>
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

