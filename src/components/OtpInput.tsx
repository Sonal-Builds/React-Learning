import { useState, useRef, useEffect } from "react"

export default function OtpInput() {

    const [otpArray, setOtpArray] = useState(new Array(7).fill(''))
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        console.log("Rendered")
    })



    const onChangeInputValue = (e: any, index: any) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            setOtpArray(prev => {
                const updated = [...prev]
                updated[index] = value
                return updated
            })
            if (value && index < otpArray.length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: any, e: any) => {
        if (e.key === "Backspace" && otpArray[index] === '') {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: any) => {
        const pasteData = e.clipboardData?.getData('text/plain').trim().slice(0, otpArray.length)
        const newArr2 = pasteData.split("")
        setOtpArray([...pasteData])
        pasteData.split("").array.forEach((element: any, index: any) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = element;
                
            }


        });


    }

    console.log("otpArray", otpArray)
    console.log("inputRefs", inputRefs.current)


    return (
        otpArray.map((digit, index) =>
            <input
                key={index}
                value={digit}
                className="otp-input"
                type="text"
                maxLength={1}
                autoFocus={index === 0 ? true : false}
                onChange={(e) => (onChangeInputValue(e, index))}
                onKeyDown={(e) => (handleKeyDown(index, e))}
                onPaste={handlePaste}
                ref={(el) => { inputRefs.current[index] = el }}
            />
        ))

}