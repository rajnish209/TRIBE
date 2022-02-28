import { useEffect, useState } from "react";
import axios from "axios";


import "../App.css"
export function Holiday() {
    const [data, setData] = useState([]);
    const [prevData, setPrevData] = useState([]);
    const [filter, setFilter] = useState(false);
    const [regionName, setRegionName] = useState("");
    const getYesterdayDate = () => {
        var today = new Date();
        console.log(today.toISOString().slice(0, 10))
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        let date = nextweek.toISOString().slice(0, 10);
        
        return date;
    }
    const lastWeekDate = () => {
        var today = new Date();
        console.log(today.toISOString().slice(0, 10))
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        let date = nextweek.toISOString().slice(0, 10);
        
        return date;
    }
    const lastMonthDate = () => {
        var today = new Date();
        console.log(today.toISOString().slice(0, 10))
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        let date = nextweek.toISOString().slice(0, 10);
        
        return date;
    }
    const filterData = async (date) => {
        filterEvent(date)
    }
    const filterEvent = (date) => {
        let newDate = new Date().toISOString().slice(0, 10);
        if (prevData.length > 0) {
          
            setData(prevData);
        }
        const filteredData = data.map((item) => {
            return item.division === regionName && item.events.filter(item => {
                var date1 = new Date(date);
                var date2 = new Date(newDate);
                var date3 = new Date(item.date)
                console.log("Item:3 ", item)
                if (date1.getTime() <= date3.getTime() && date2.getTime() >= date3.getTime()) {
                    return item
                }
            })
        })
        setPrevData(data)
        setData(filteredData)
        setFilter(true);
    }
    const handleChange = (e) => {
        if (e.target.value === "yesterday") {
            const date = getYesterdayDate();
            filterData(date)
        }else if (e.target.value === "last-month") {
            const date = lastMonthDate();
            filterData(date)
        }else if (e.target.value === "last-week") {
            const date = lastWeekDate();
            filterData(date)
        }
    }
    const getData = () => {
         axios.get("https://gov.uk/bank-holidays.json").then((res) => {
            let arr = [];
            for (let key in res.data) {
                arr.push(res.data[key]);
            }
             setData(arr);
        })
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div>
                <label htmlFor="">Select Region: </label>
            <select name="" id="" onChange={(e) => {
                if (prevData.length !== 0) {
                    console.log(prevData)
                    setData(prevData)
                    setPrevData([])
                }
                setFilter(false)
                setRegionName(e.target.value)
            }}>
                <option value="disabled" selected disabled></option>
                <option value="scotland">Scotland</option>
                <option value="england-and-wales">england-and-wales</option>
                <option value="northern-ireland">northern-ireland</option>
                </select>
                <br />
                <br />
                <label htmlFor="">Filter: </label>
            <select name="" id="" onChange={handleChange}>
                <option value="disabled" selected disabled></option>
                <option value="yesterday">Yesterday</option>
                <option value="last-month">Last Month</option>
                <option value="last-week">Last Week</option>
            </select>
                
            </div>
        <div className="Container">
                {console.log("data: ", data[0], data[1], data[2])}
                {filter && data[0].length == 0 && data[1] == false && data[2] == false ? <div>
                    
                </div>
                :filter ? <div>
                     <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        
                                    </tr>
                                </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    console.log("item: ", item.length)
                                    return item.length > 0 &&
                                        item.map((event, index) => {
                                              return  <tr key={index}>
                                            <td>{event.title}</td>
                                           
                                        </tr>
                                            })
                                        
                                })}
                                </tbody>
                            </table>
                        </div>
                   
                </div>
                 : data.map((items, index) => {
                    return items.division === regionName && items.length !== 0 &&
                    <div key={index}>
                    
                     <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                       
                                    </tr>
                                </thead>
                            <tbody>
                                {items.events.map((event, index) => {
                        return <tr key={index}>
                                    <td>{event.title}</td>
                                   
                                </tr>
                            })}
                                </tbody>
                            </table>
                        </div>
                   
                </div>
            })} 
            </div>
            </>
    )
}