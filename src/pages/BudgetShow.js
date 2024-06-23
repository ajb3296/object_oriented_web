import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { getDomain } from '../utils/domain';
import { post } from '../utils/requests';

export default function BudgetShow() {

    const [search, setSearch] = useState('');

    const [budgetList, setBudgetList] = useState([]);
    
    return (
        <div>
            <h1>예산서조회</h1>

            <input type='text' placeholder='이름 검색' onChange={(e) => {setSearch(e.target.value)}} />
            <button onClick={() => {
                post(getDomain() + "/budget/search-budget", {
                    budgetName: search
                })
                .then((response) => {
                    console.log(response);
                    setBudgetList(response);
                })
            }}>검색</button>

            <br />
            <br />

            <table border="1">
                <tr>
                    <th>년도</th>
                    <th>예산명</th>
                    <th>예산액</th>
                    <th>인건비</th>
                    <th>기본비</th>
                    <th>주요사업비</th>
                    <th>집행 상세 내역</th>
                    <th>첨부파일 다운로드</th>
                </tr>

                {
                    budgetList.map((budget, index) => {
                        return (
                            <tr key={index}>
                                <td>{budget.year}</td>
                                <td>{budget.budgetName}</td>
                                <td>{budget.budgetAmount}</td>
                                <td>{budget.budgetPersonnelExpenses}</td>
                                <td>{budget.budgetBasicExpenses}</td>
                                <td>{budget.budgetMajorProjectExpenses}</td>
                                <td>
                                    <table border="1">
                                        <tr>
                                            <th>년도</th>
                                            <th>인건비 집행액</th>
                                            <th>기본비 집행액</th>
                                            <th>주요사업비 집행액</th>
                                        </tr>
                                        {
                                            budget.executionDetailList.map((executionDetail, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{executionDetail.year}</td>
                                                        <td>{executionDetail.execPersonnelExpenses}</td>
                                                        <td>{executionDetail.execBasicExpenses}</td>
                                                        <td>{executionDetail.execMajorProjectExpenses}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </td>
                                <td>
                                    {
                                        budget.fileInfoList.map((fileInfo, index) => {
                                            return (
                                                <div key={index}>
                                                    <Link to={getDomain() + fileInfo.fileDownloadUri}>{fileInfo.fileName}</Link><br />
                                                </div>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
}