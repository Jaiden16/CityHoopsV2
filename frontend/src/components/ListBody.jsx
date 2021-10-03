import React from 'react'
import "../Css/ListBody.css"

export default function ListBody(props) {
    let skills = props.skills
    let label = ""

    // blocks: 1
    // handle: 1
    // interior_defence: 1
    // iq: 1
    // leadership: 1
    // perimiter_defence: 1
    // rebounding: 1
    // shooting: 1
    // steals: 1

    // console.log(skills)
    return (
        <div className="">
            
                <ul className="list_header">
                    <li><p>Ability</p></li>
                    <li><p>Personal</p></li>
                    <li><p>Community</p></li>
                </ul>



            
                <ul className="list_abilities">
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
                            <li key={i}>{label}</li>
                        )
                    })}
                </ul>
    


           
                {/* <ul className={"list_stats"}>
                    {Object.values(skills).map((keyname, i) => {

                        return (
                            <li key={i}>{keyname}</li>
                        )
                    })}
                </ul> */}
            
        </div>
    )
}