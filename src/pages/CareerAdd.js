import React, { useState } from 'react';
import Select from "react-select";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { getDomain } from "../utils/domain";
import { post } from '../utils/requests';

export default function CareerAdd() {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('M');

    const [assignmentList, setAssignmentList] = useState([]);
    const [awardList, setAwardList] = useState([]);
    const [certificateList, setCertificateList] = useState([]);
    const [disciplineList, setDisciplineList] = useState([]);
    const [trainingList, setTrainingList] = useState([]);

    const [tempTransferName, setTempTransferName] = useState('');
    const [tempTransferDescription, setTempTransferDescription] = useState('');
    const [tempTransferDate, setTempTransferDate] = useState(new Date());
    const [tempTransferLocation, setTempTransferLocation] = useState('');
    const [tempTransferDepartment, setTempTransferDepartment] = useState('');

    const [tempAwardName, setTempAwardName] = useState('');
    const [tempAwardDescription, setTempAwardDescription] = useState('');
    const [tempAwardDate, setTempAwardDate] = useState(new Date());

    const [tempCertificateName, setTempCertificateName] = useState('');

    const [tempDisciplineName, setTempDisciplineName] = useState('');
    const [tempDisciplineDescription, setTempDisciplineDescription] = useState('');
    const [tempDisciplineDate, setTempDisciplineDate] = useState(new Date());

    const [tempTrainingName, setTempTrainingName] = useState('');
    const [tempTrainingDate, setTempTrainingDate] = useState(new Date());


    const departmentList = [
        { value: "AD", label: "AD" },
        { value: "HR", label: "HR" },
        { value: "OTHER", label: "OTHER" }
    ]

    const positionList = [
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

            <h2>이름</h2>
            <input type='text' placeholder='이름' onChange={(e) => setName(e.target.value)} />

            <h2>학력</h2>
            <input type='text' placeholder='학력' onChange={(e) => setEducation(e.target.value)} />

            <h2>직급</h2>
            <Select
                className="직급"
                options={positionList}
                onChange={(selectedOption) => setPosition(selectedOption.value)}
                placeholder="직급"
            />

            <h2>부서</h2>
            <Select
                className="부서"
                options={departmentList}
                onChange={(selectedOption) => setDepartment(selectedOption.value)}
                placeholder="부서"
            />

            <h2>나이</h2>
            <input type='text' placeholder='나이' value={age} onChange={(e) => {
                setAge(
                    isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10)
                )
            }} />

            <h2>성별</h2>
            <Select
                className="성별"
                options={sexList}
                onChange={(selectedOption) => setSex(selectedOption.value)}
                placeholder="성별"
            />

            <h2>발령 이력</h2>
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
            발령일 :
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
                        assignmentDate: tempTransferDate.getFullYear() + "-" + (tempTransferDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempTransferDate.getDate().toString().padStart(2, '0'),
                        assignmentLocation: tempTransferLocation,
                        assignmentDepartment: tempTransferDepartment
                    }
                ])
            }}>발령 추가</button>


            <h2>상 이력</h2>
            <table border="1">
                <tr>
                    <th>상 명</th>
                    <th>상 설명</th>
                    <th>상 날짜</th>
                </tr>

                {
                    awardList.map((award, index) => {
                        return (
                            <tr key={index}>
                                <td>{award.awardName}</td>
                                <td>{award.awardDescription}</td>
                                <td>{award.awardDate}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='상 명' onChange={(e) => {setTempAwardName(e.target.value)}} /><br />
            <input type='text' placeholder='상 설명' onChange={(e) => {setTempAwardDescription(e.target.value)}} /><br />
            상 날짜 : 
            <DatePicker 
                showIcon
                className="datepicker"
                dateFormat="yyyy년 MM월 dd일"
                selected={tempAwardDate}
                onChange={(date)=>setTempAwardDate(date)}
                showDisabledMonthNavigation
            /><br />

            <button onClick={() => {
                setAwardList([
                    ...awardList,
                    {
                        awardName: tempAwardName,
                        awardDescription: tempAwardDescription,
                        awardDate: tempAwardDate.getFullYear() + "-" + (tempAwardDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempAwardDate.getDate().toString().padStart(2, '0'),
                    }
                ])
            }}>상 추가</button>

            <h2>자격증 이력</h2>
            <table border="1">
                <tr>
                    <th>자격증 명</th>
                </tr>

                {
                    certificateList.map((certificate, index) => {
                        return (
                            <tr key={index}>
                                <td>{certificate.certificationName}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='자격증 명' onChange={(e) => {setTempCertificateName(e.target.value)}} /><br />

            <button onClick={() => {
                setCertificateList([
                    ...certificateList,
                    {
                        certificationName: tempCertificateName,
                    }
                ])
            }}>자격증 추가</button>



            <h2>징계 이력</h2>
            <table border="1">
                <tr>
                    <th>징계 명</th>
                    <th>징계 설명</th>
                    <th>징계 날짜</th>
                </tr>

                {
                    disciplineList.map((discipline, index) => {
                        return (
                            <tr key={index}>
                                <td>{discipline.disciplineName}</td>
                                <td>{discipline.disciplineDescription}</td>
                                <td>{discipline.disciplineDate}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='징계 명' onChange={(e) => {setTempDisciplineName(e.target.value)}} /><br />
            <input type='text' placeholder='징계 설명' onChange={(e) => {setTempDisciplineDescription(e.target.value)}} /><br />
            징계 날짜 : 
            <DatePicker 
                showIcon
                className="datepicker"
                dateFormat="yyyy년 MM월 dd일"
                selected={tempDisciplineDate}
                onChange={(date)=>setTempDisciplineDate(date)}
                showDisabledMonthNavigation
            /><br />

            <button onClick={() => {
                setDisciplineList([
                    ...disciplineList,
                    {
                        disciplineName: tempDisciplineName,
                        disciplineDescription: tempDisciplineDescription,
                        disciplineDate: tempDisciplineDate.getFullYear() + "-" + (tempDisciplineDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempDisciplineDate.getDate().toString().padStart(2, '0'),
                    }
                ])
            }}>징계 추가</button>


            <h2>교육 수강 이력</h2>
            <table border="1">
                <tr>
                    <th>교육 명</th>
                    <th>교육 날짜</th>
                </tr>

                {
                    trainingList.map((training, index) => {
                        return (
                            <tr key={index}>
                                <td>{training.trainingTitle}</td>
                                <td>{training.trainingDate}</td>
                            </tr>
                        )
                    })
                }

            </table>
            <input type='text' placeholder='교육 명' onChange={(e) => {setTempTrainingName(e.target.value)}} /><br />
            교육 날짜 : 
            <DatePicker 
                showIcon
                className="datepicker"
                dateFormat="yyyy년 MM월 dd일"
                selected={tempTrainingDate}
                onChange={(date)=>setTempTrainingDate(date)}
                showDisabledMonthNavigation
            /><br />

            <button onClick={() => {
                setTrainingList([
                    ...trainingList,
                    {
                        trainingTitle: tempTrainingName,
                        trainingDate: tempTrainingDate.getFullYear() + "-" + (tempTrainingDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempTrainingDate.getDate().toString().padStart(2, '0'),
                    }
                ])
            }}>교육 추가</button>

            <br />
            <br />
            <br />

            <button onClick={() => {
                post(getDomain() + "/career/register", {
                    employeeName: name,
                    education: education,
                    position: position,
                    department: department,
                    age: age,
                    sex: sex,
                    assignmentList: assignmentList,
                    awardList: awardList,
                    certificateList: certificateList,
                    disciplineList: disciplineList,
                    trainingList: trainingList
                })
                .then((response) => {
                    console.log(response);
                    alert("등록되었습니다.");
                })
            }}>등록</button>
        </div>
    );
}