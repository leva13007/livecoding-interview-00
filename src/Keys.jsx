import React from "react"
const Row = ({label}) => {
  const [color, setColor] = React.useState("grey");
  return (
    <div style={{
      backgroundColor: color
    }}>
      <h4>{label}</h4>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    </div>
  )
}

export const Keys = () => {
  const [items, setItems] = React.useState([
    {id: 1, label: "Apple"},
    {id: 2, label: "Banana"},
    {id: 3, label: "Orange"},
  ])

  const addIemToBegin = () => {
    setItems(prev => [{id: Math.random(), label: "New Item"}, ...prev])
  }

  return (
    <div>
      List
      <button onClick={addIemToBegin}>Add to the begin</button>
      <ul>
        {
          items.map((item, i) => (
            <Row key={item.label} label={item.label} />
          ))
        }
      </ul>
    </div>
  )
}