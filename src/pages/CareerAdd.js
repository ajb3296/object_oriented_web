import React, { useState } from 'react';
import Select from "react-select";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function CareerAdd() {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [rank, setRank] = useState('');
    const [department, setDepartment] = useState('');
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('M');
    const [assignmentList, setAssignmentList] = useState([]);
    const [awardList, setAwardList] = useState([]);

    const [tempTransferName, setTempTransferName] = useState('');
    const [tempTransferDescription, setTempTransferDescription] = useState('');
    const [tempTransferDate, setTempTransferDate] = useState(new Date());
    const [tempTransferLocation, setTempTransferLocation] = useState('');
    const [tempTransferDepartment, setTempTransferDepartment] = useState('');

    const [tempAwardName, setTempAwardName] = useState('');
    const [tempAwardDescription, setTempAwardDescription] = useState('');
    const [tempAwardDate, setTempAwardDate] = useState(new Date());

    const rankList = [
        { value: "AD", label: "AD" },
        { value: "HR", label: "HR" },
        { value: "OTHER", label: "OTHER" }
    ]

    const departmentList = [
        { value: "INTERN", label: "INTERN" },
        { value: "JUNIOR", label: "JUNIOR" },
        { value: "SENIOR", label: "SENIOR" },
        { value: "MANAGER", label: "MANAGER" },
        { value: "LEADER", label: "LEADER" },
        { value: "DIRECTOR", label: "DIRECTOR" },
        { value: "CEO", label: "CEO" }
    ]

    const sexList = [
        { value: "M", label: "남" },
        { value: "F", label: "여" }
    ]

    return (
        <div>
            <h1>경력정보등록</h1>

            <p>이름</p>
            <input type='text' placeholder='이름' onChange={(e) => setName(e.target.value)} />

            <p>학력</p>
            <input type='text' placeholder='학력' onChange={(e) => setEducation(e.target.value)} />

            <p>직급</p>
            <Select
                className="직급"
                options={rankList}
                onChange={(selectedOption) => setRank(selectedOption.value)}
                placeholder="직급"
            />

            <p>부서</p>
            <Select
                className="부서"
                options={departmentList}
                onChange={(selectedOption) => setDepartment(selectedOption.value)}
                placeholder="부서"
            />

            <p>나이</p>
            <input type='text' placeholder='나이' value={age} onChange={(e) => {
                setAge(
                    isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10)
                )
            }} />

            <p>성별</p>
            <Select
                className="성별"
                options={sexList}
                onChange={(selectedOption) => setSex(selectedOption.value)}
                placeholder="성별"
            />

            <p>발령 이력</p>
            <table border="1">
                <tr>
                    <th>발령명</th>
                    <th>발령설명</th>
                    <th>발령일</th>
                    <th>발령지</th>
                    <th>발령부서</th>
                </tr>

                {
                    assignmentList.map((assignment, index) => {
                        return (
                            <tr key={index}>
                                <td>{assignment.assignmentName}</td>
                                <td>{assignment.assignmentDescription}</td>
                                <td>{assignment.assignmentDate}</td>
                                <td>{assignment.assignmentLocation}</td>
                                <td>{assignment.assignmentDepartment}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='발령명' onChange={(e) => {setTempTransferName(e.target.value)}} /><br />
            <input type='text' placeholder='발령설명' onChange={(e) => {setTempTransferDescription(e.target.value)}} /><br />
            <DatePicker 
                showIcon
                className="datepicker"
                dateFormat="yyyy년 MM월 dd일"
                selected={tempTransferDate}
                onChange={(date)=>setTempTransferDate(date)}
                showDisabledMonthNavigation
            /><br />
            <input type='text' placeholder='발령지' onChange={(e) => {setTempTransferLocation(e.target.value)}} /><br />
            <input type='text' placeholder='발령부서' onChange={(e) => {setTempTransferDepartment(e.target.value)}} /><br />
            <button onClick={() => {
                setAssignmentList([
                    ...assignmentList,
                    {
                        assignmentName: tempTransferName,
                        assignmentDescription: tempTransferDescription,
                        assignmentDate: tempTransferDate.getFullYear() + "-" + (tempTransferDate.getMonth() + 1) + "-" + tempTransferDate.getDate(),
                        assignmentLocation: tempTransferLocation,
                        assignmentDepartment: tempTransferDepartment
                    }
                ])
            }}>발령 추가</button>


            <p>상 이력</p>
            <table border="1">
                <tr>
                    <th>상 명</th>
                    <th>상 설명</th>
                    <th>상 날짜</th>
                </tr>

                {
                    assignmentList.map((assignment, index) => {
                        return (
                            <tr key={index}>
                                <td>{assignment.assignmentName}</td>
                                <td>{assignment.assignmentDescription}</td>
                                <td>{assignment.assignmentDate}</td>
                                <td>{assignment.assignmentLocation}</td>
                                <td>{assignment.assignmentDepartment}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='상 명' onChange={(e) => {setTempAwardName(e.target.value)}} /><br />
            <input type='text' placeholder='상 설명' onChange={(e) => {setTempTransferDescription(e.target.value)}} /><br />
            상 날짜: 
            <DatePicker 
                showIcon
                className="datepicker"
                dateFormat="yyyy년 MM월 dd일"
                selected={tempTransferDate}
                onChange={(date)=>setTempTransferDate(date)}
                showDisabledMonthNavigation
            /><br />
            <button onClick={() => {
                setAssignmentList([
                    ...assignmentList,
                    {
                        assignmentName: tempTransferName,
                        assignmentDescription: tempTransferDescription,
                        assignmentDate: tempTransferDate.getFullYear() + "-" + (tempTransferDate.getMonth() + 1) + "-" + tempTransferDate.getDate(),
                        assignmentLocation: tempTransferLocation,
                        assignmentDepartment: tempTransferDepartment
                    }
                ])
            }}>발령 추가</button>
        </div>
    );
}