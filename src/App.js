import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Laureate from './components/Laureate';
import Header from './components/Header';

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
    console.log(nobleList)
  }, [selectyear, category, nobleList])

  return (
    <div className="container">
      <Header />
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
                <th itemScope="col">name</th>
                <th itemScope="col">count</th>
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
