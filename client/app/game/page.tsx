import React from 'react'
import Image from 'next/image'
import Field from '../assets/Field.svg'

const Game = (): React.JSX.Element => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src={Field} width={700} alt="Picture of the author" />
      </div>
    </>
  )
}

export default Game
