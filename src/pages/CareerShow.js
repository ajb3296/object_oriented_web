import axios from 'axios';
import React, { useState } from 'react';
import { getDomain } from '../utils/domain';

export default function CareerShow() {

    const [condition, setCondition] = useState({
        employeeName: '',
        department: '',
        position: '',
        age: ''
    });

    const { employeeName, department, position, age } = condition;

    const [careerList, setCareerList] = useState([]);

    const fetchCareerList = async () => {
        const response = await axios.post(`${getDomain()}/career/search-career`, {condition});

        setCareerList(response.data);
        console.log(response.data);
        setCondition({
            employeeName: '',
            department: '',
            position: '',
            age: ''
        });
    }

    const handleChange = (e) => {
        console.log(condition);

        setCondition({
            ...condition,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            <h1>경력정보조회</h1>
            <div className='condition-input-conainer'>
                <input name="employeeName" onChange={handleChange} type="text" value={employeeName} placeholder="이름" />
                <input name="department" onChange={handleChange} type="text" value={department} placeholder="부서" />
                <input name="position" onChange={handleChange} type="text" value={position} placeholder="직급" />
                <input name="age" onChange={handleChange} type="text" value={age} placeholder="나이" />
                <button type='submit' onClick={fetchCareerList}>검색</button>
            </div>
            <div style={{width: "100%", border:"1px solid black", margin:"30px"}}></div>
            <div className='search-row-container'>
                <table border="1">
                <tr>
                    <th>사원이름</th>
                    <th>힉력</th>
                    <th>직급</th>
                    <th>부서</th>
                    <th>나이</th>
                    <th>성별</th>
                    <th>발령 이력</th>
                    <th>상 이력</th>
                    <th>징계 이력</th>
                    <th>교육 이력</th>
                </tr>
                {
                    careerList.map((career, index) => {
                        return (
                            <tr>
                                <td>{career.employeeName}</td>
                                <td>{career.education}</td>
                                <td>{career.position}</td>
                                <td>{career.department}</td>
                                <td>{career.age}</td>
                                <td>{career.sex === 'M' ? '남' : '여'}</td>
                                <td>
                                    <table border="1">
                                        <tr>
                                            <th>발령명</th>
                                            <th>발령 설명</th>
                                            <th>발령일</th>
                                            <th>발령지</th>
                                            <th>발령 부서</th>
                                        </tr>
                                            {
                                                career.assignmentList.map((assignment, index) => {
                                                    return (
                                                        <tr>
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
                                </td>
                                <td>
                                    <table border="1">
                                        <tr>
                                            <th>상 명</th>
                                            <th>상 설명</th>
                                            <th>상 날짜</th>
                                        </tr>
                                        {
                                            career.awardList.map((award, index) => {
                                                return (
                                                    <tr>
                                                        <td>{award.awardName}</td>
                                                        <td>{award.awardDescription}</td>
                                                        <td>{award.awardDate}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </td>
                                <td>
                                    <table border="1">
                                        <tr>
                                            <th>징계 명</th>
                                            <th>징계 설명</th>
                                            <th>징계 날짜</th>
                                        </tr>
                                        {
                                            career.disciplineList.map((discipline, index) => {
                                                return (
                                                    <tr>
                                                        <td>{discipline.disciplineName}</td>
                                                        <td>{discipline.disciplineDescription}</td>
                                                        <td>{discipline.disciplineDate}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </td>
                                <td>
                                    <table border="1">
                                        <tr>
                                            <th>자격증 명</th>
                                        </tr>
                                        {
                                            career.certificateList.map((certificate, index) => {
                                                return (
                                                    <tr>
                                                        <td>{certificate.certificationName}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </td>
                            </tr>
                        )
                    }
                )
                }
                </table>
            </div>
        </div>
    );
}