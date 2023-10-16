import { Inter } from 'next/font/google'
import { ChangeEvent, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [fileJson, setFileJson] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorFile, setErrorFile] = useState<string | null>("")
  const [title, setTitle] = useState("")

  function handleFileJson(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) {
      console.log("opaaa");
      return;
    }
    const selectedFile = files[0];
    const titleJSON = selectedFile.name
    setLoading(true)
    setTitle(titleJSON)
    console.log("entrei aqui", selectedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("entrei no reader", e);
      const content = e.target?.result as string
      try {
        console.log("carregando...");
        const parsedJson = JSON.parse(content)
        if (typeof parsedJson === 'object') {
          setFileJson(parsedJson);
          console.log(parsedJson);
        } else {
          setErrorFile("Invalid file. Please load a valid JSON file.")
          console.log("O arquivo JSON não está formatado corretamente.");
        }

      } catch (error) {
        setErrorFile("Invalid file. Please load a valid JSON file.")
        console.error("Erro ao analisar o JSON:", error);
      }
      finally {
        setLoading(false); // Desativar o indicador de carregamento, independente do resultado
      }
    }
    reader.readAsText(selectedFile);
    // console.log(selectedFile);
  }


  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-6 p-24 justify-center ${inter.className}`}
    >
      <h1 className='font-bold text-5xl text-center'>JSON Tree Viewer</h1>
      <p className='font-normal text-3xl text-center' >Simple JSON Viewer that runs completely on-client. No data exchange</p>

      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          fileJson ? (
            <>
              <p className='font-bold text-2xl text-black mt-2'>{title}</p>
              <pre>{JSON.stringify(fileJson, null, 2)}</pre>
            </>
          ) : (
            <div className='flex flex-col gap-6'>
              <div className='flex justify-center'>
                <label htmlFor="JSON" className='flex py-[6px] px-3 justify-center items-center gap[10px]  border rounded-[5px] border-solid
                    border-black bg-[#efefef] opacity-70 cursor-pointer hover-bg-[#dbdbdb] text-black font-medium text-base max-w-[120px]'>Load JSON</label>
                <input className='sr-only' id='JSON' type="file" accept=".json" onChange={handleFileJson} />
              </div>
              {errorFile && (
                <p className='text-red-500 font-normal text-base'>{errorFile}</p>
              )}
            </div>
          )
        )}
      </div>
    </main>
  )
}
