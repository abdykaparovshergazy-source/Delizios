import React, { useState } from 'react'
import './block5.css'
import ChefsData from '../../ChefsData'

function Block5() {
  const [open, setOpen] = useState(false)
  const [selectedChef, setSelectedChef] = useState(null)
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 })

  const handleChefClick = (chef, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setModalPos({
      top: rect.top + rect.height / 2 + window.scrollY,
      left: rect.right + 10                               
    })
    setSelectedChef(chef)
    setOpen(true)
  }


  return (
    <div className='block5 container'>
      <h1 className="chef-title">Our greatest chef</h1>

      <div className="chef-cards">
        {ChefsData.slice(0, 3).map(chef => (
          <div
            key={chef.id}
            className="chef-card"
            onClick={(e) => handleChefClick(chef, e)}
          >
            <div className="chef-img">
              <img src={chef.image} alt={chef.name} />
            </div>
            <h3>{chef.name}</h3>
            <p>{chef.role}</p>
          </div>
        ))}
      </div>

      <button
        className="view-btn"
        onClick={() => {
          setSelectedChef(null); 
          setModalPos({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
          setOpen(true);
        }}
      >
        View all
      </button>


      {open && (
        <div className="chef-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="chef-modal"
            style={{
              top: modalPos.top,
              left: modalPos.left,
              transform: 'translate(-50%, -50%)' 
            }}
            onClick={e => e.stopPropagation()}
          >

            <span className="close" onClick={() => setOpen(false)}>✕</span>

            {selectedChef ? (
              <>
                <img src={selectedChef.image} alt={selectedChef.name} />
                <h2>{selectedChef.name}</h2>
                <h4>{selectedChef.role}</h4>
                <p><strong>Experience:</strong> {selectedChef.experience}</p>
                <p>{selectedChef.description}</p>
              </>
            ) : (
              ChefsData.map(chef => (
                <div key={chef.id}>
                  <img src={chef.image} alt={chef.name} />
                  <h3>{chef.name}</h3>
                  <p>{chef.role}</p>
                  <p><strong>Experience:</strong> {chef.experience}</p>
                  <p>{chef.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Block5
