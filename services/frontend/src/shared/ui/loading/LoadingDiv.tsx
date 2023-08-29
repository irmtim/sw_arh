import { useEffect, useState } from "react"

const LoadingDiv = () => {
  const styles = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: '#7e8299',
    fontWeight: '500',
    margin: '0',
    width: 'auto',
    padding: '1rem 2rem',
    top: 'calc(50% - 2rem)',
    left: 'calc(50% - 4rem)',
  }

  const [transition, setTransition] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setTransition('loading-dark')
    }, 500);
  })

  return (
    <div className={`loading-container ${transition}`}>
      <div>Загрузка данных...</div>
    </div>
  )
  // return <div style={{...styles, position: 'absolute', textAlign: 'center'}}>Загрузка данных...</div>
}

export { LoadingDiv }
