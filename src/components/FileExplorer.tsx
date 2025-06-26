


export default function FileExplorer() {

    const File = [
        { folder: ['file1', 'file2', 'file3'] },
        { folder: ['file4', 'file5'] }
    ]



    return (
        <>
            <h1>File Explorer</h1>
            {
                File.map((fol) => (
                    <>
                        <span>{'>'}</span>
                    {fol.folder.map((item) => (
                        <li>{item}</li>
                        ))}
                    </>


                ))
            }
        </>
    )
}