import { useState } from "react"

function IndexPage() {
  const [data, setData] = useState("")

  return (
    <div
    className='App'
    style={{
      display: "flex",
      flexDirection: "column",
      padding: 16
    }}>
    <h1>Welcome to your <a href="https://www.plasmo.com">Plasmo</a>!</h1>
    <input onChange={(e) => setData(e.target.value)} value={data} />

    <a href="https://docs.plasmo.com">READ THE DOCS!</a>
  </div>
  )
}

export default IndexPage
