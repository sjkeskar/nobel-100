import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Laureate from './components/Laureate';

function App() {
  const [nobleList, setNobles] = useState([])
  const [years, setYear] = useState([])
  const [category, setSelectCat] = useState("")
  const [selectyear, setSelectYear] = useState("")
  const [displayData, setData] = useState([])
  const [ftimesw, setFtw] = useState([])
  const Categories = ["chemistry", "peace", "literature", "physics", "medicine", "economics"]

  const fetchData = async () => {
    const { data: { prizes } } = await axios.get('http://api.nobelprize.org/v1/prize.json')
    const data = prizes.filter(prize => prize.year <= 2018)
    setNobles(data)
  }

  const setYearAction = () => {
    let v = []
    for (let i = 1901; i <= 2018; i++) {
      v.push(i)
    }
    setYear(v)
  }

  const filterData = () => {
    let data = nobleList
    if (selectyear !== "" && category !== "") {
      data = nobleList.filter(nobles => (
        nobles.year === selectyear && nobles.category === category
      ))
    } else if (selectyear !== "" && category === "") {
      data = nobleList.filter(nobles => (nobles.year === selectyear))
    } else if (selectyear === "" && category !== "") {
      data = nobleList.filter(nobles => (nobles.category === category))
    }
    setData(data);
  }

  const fourTimesWinners = () => {
    let data = nobleList
    let nums = {}
    data.forEach((noble) => {
      noble.laureates && noble.laureates.forEach((x) => {
        let y = `${x.firstname} ${x.surname ? x.surname : ""}`
        if (nums[y]) {
          nums[y] += 1
        } else {
          nums[y] = 1
        }
      })
    })
    let l = []
    for (let a in nums) {
      if (nums[a] > 1) {
        l.push({ name: a, count: nums[a] })
      }
    }
    setFtw(l)
  }

  useEffect(() => {
    fetchData();
    setYearAction();
  }, [])

  useEffect(() => {
    filterData();
    fourTimesWinners()
  }, [selectyear, category, nobleList])

  return (
    <div className="container">
      {/* <div className="row m-1">
        <h3 className='text-center'>Nobel Prize winners in the last 100 years</h3>
        <div className="col-3"></div>
        <div className="col-6 m-3 p-2">
          <h5>Nobel Laureates who have Won Nobel Prize multiple times</h5>
          {ftimesw.map((obj, index) => (
            <div key={index}>{`${obj.name} won Nobel Prize ${obj.count} many times`}</div>
          ))}
        </div>
        <div className="col-3"></div>
      </div> */}
      <div className="row m-1">
        <div className="col-4">
          <div className="row mt-4 mx-1 pt-1">
            <h5>Filter Prizes</h5>
          </div>
          <div className="row my-4 mx-1 p-1">
            <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectYear(e.target.value)}>
              <option defaultChecked value={""}>Select an year</option>
              {years.map((year, index) => (
                <option value={year} key={index}>{year}</option>
              ))}
            </select>
          </div>
          <div className="row my-4 mx-1 p-1">
            <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectCat(e.target.value)} >
              <option defaultChecked value={""}>Select a Category</option>
              {Categories.map((category, index) => (
                <option value={category} key={index}>{category}</option>
              ))}
            </select>
          </div>
          <div className="row my-4 p-1">
            <h5 className='text-center'>Nobel Laureates who have been awarded Nobel Prize multiple times</h5>
            <table className="table">
              <thead>
                <td itemScope="col">name</td>
                <td itemScope="col">count</td>
              </thead>
              <tbody>

                {ftimesw.map((obj, index) => (
                  <tr key={index}>
                    <td itemScope="row">{obj.name}</td>
                    <td>{obj.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-8">
          {displayData.map((nobles, index) => (
            <Laureate Data={nobles} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
