import { useEffect, useState } from "react"



export default function ProgressBar({ progress }: { progress: number }) {

    const [value,setValue] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setValue(progress)
        },500)
    })


    return (
        <>
            <h1>Progress Bar</h1>
            <div className="progressBar">
                <div
                    className="insideBar"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemax={100}
                    aria-valuemin={0}
                    style={{
                        // width: `${value}%`,
                        transform:`translateX(${value - 100}%)`,
                        color: progress < 5 ? 'red' : 'black'
                    }}>
                    {`${progress}%`}
                </div>
            </div>

        </>

    )

}