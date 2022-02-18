import React from 'react'

const Laureate = ({ Data }) => {
    const Year = Data.year
    const category = Data.category
    return (
        <>
            {Data.laureates ? Data.laureates.map((element) => (
                <div key={element.id} className="card row single-laureate m-3 p-2">
                    <div className="card-body">
                        <h5 className="card-title">{element.firstname} {element.surname}</h5>
                        <p>{` Year ${Year} in ${category}`}</p>
                    </div>
                    <br />
                </div>
            )) : (
                <div className="card row single-laureate m-3 p-2">
                    <div className='card-body m-1 p-1'>No Nobel {category} Prize was awarded in {Year}</div>
                </div>
            )}
        </>
    )
}

export default Laureate