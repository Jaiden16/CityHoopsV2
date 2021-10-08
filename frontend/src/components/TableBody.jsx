import React from 'react'

export default function TableBody(props) {
    let skills = props.skills
    let communitySkills = props.mock
    let label = ""
    // console.log("table body component ", skills)
    // let skillsLabel = Object.keys(skills)
    // let skillsValue = Object.values(skills)
    // console.log("skills Label", skillsLabel)
    // console.log("skills Value", skillsValue)
    // console.log(props.key)

    // shooting: 1
    // handle: 1
    // perimiter_defence: 1
    // interior_defence: 1
    // rebounding: 1
    // steals: 1
    // blocks: 1
    // iq: 1
    // leadership: 1

    // console.log(skills)
    return (
        <>
            {Object.keys(skills).map((keyname, i) => {
                switch (keyname) {
                    case "shooting":
                        label = "Shooting"
                        break;
                    case "handle":
                        label = "Handle"
                        break;
                    case "perimiter_defence":
                        label = "Perimiter Defence"
                        break;
                    case "interior_defence":
                        label = "Interior Defence"
                        break;
                    case "rebounding":
                        label = "Rebounding"
                        break;
                    case "blocks":
                        label = "Blocks"
                        break;
                    case "steals":
                        label = "Steals"
                        break;
                    case "leadership":
                        label = "Leadership"
                        break;
                    case "iq":
                        label = "Court IQ"
                        break;
                    default: label = "enter text"

                }
                return (
                    <tr key={i}>
                        <th>{label}</th>
                        <td>{skills[keyname]}</td>
                        <td>{communitySkills[keyname]}</td>
                        
                    </tr>

                )
            })}
        </>
    )


}

