import React, { useState } from 'react';

import { getDomain } from '../utils/domain';
import { post, post_formdata } from '../utils/requests';

export default function BudgetAdd() {
    const [year, setYear] = useState('');
    const [budgetName, setBudgetName] = useState(''); // 예산명
    const [budgetAmount, setBudgetAmount] = useState(''); // 예산액
    const [budgetPersonnelExpenses, setBudgetPersonnelExpenses] = useState(''); // 인건비
    const [budgetBasicExpenses, setBudgetBasicExpenses] = useState(''); // 기본비
    const [budgetMajorProjectExpenses, setBudgetMajorProjectExpenses] = useState(''); // 주요사업비
    const [agreementFile, setAgreementFile] = useState(null); // 협약서
    const [businessPlanFile, setBusinessPlanFile] = useState(null); // 사업수행 계획서

    const [executionDetailList, setExecutionDetailList] = useState([]); // 예산집행내역

    const [tempYear, setTempYear] = useState('');
    const [tempExecPersonnelExpenses, setTempExecPersonnelExpenses] = useState('');
    const [tempExecBasicExpenses, setTempExecBasicExpenses] = useState('');
    const [tempMajorProjectExpenses, setTempMajorProjectExpenses] = useState('');

    return (
        <div>
            <h1>예산편성신청</h1>

            <h2>년도</h2>
            <input type='text' placeholder='년도' onChange={(e) => setYear(e.target.value)} />

            <h2>예산명</h2>
            <input type='text' placeholder='예산명' onChange={(e) => setBudgetName(e.target.value)} />

            <h2>예산액</h2>
            <input type='text' placeholder='예산액' onChange={(e) => setBudgetAmount(e.target.value)} />

            <h2>인건비</h2>
            <input type='text' placeholder='인건비' onChange={(e) => setBudgetPersonnelExpenses(e.target.value)} />

            <h2>기본비</h2>
            <input type='text' placeholder='기본비' onChange={(e) => setBudgetBasicExpenses(e.target.value)} />

            <h2>주요사업비</h2>
            <input type='text' placeholder='주요사업비' onChange={(e) => setBudgetMajorProjectExpenses(e.target.value)} />

            <h2>집행 상세 내역</h2>
            <table border="1">
                <tr>
                    <th>년도</th>
                    <th>인건비 집행액</th>
                    <th>기본비 집행액</th>
                    <th>주요사업비 집행액</th>
                </tr>

                {
                    executionDetailList.map((executionDetail, index) => {
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
            
            <input type='text' placeholder='년도' onChange={(e) => setTempYear(e.target.value)} /><br />
            <input type='text' placeholder='인건비 집행액' onChange={(e) => setTempExecPersonnelExpenses(e.target.value)} /><br />
            <input type='text' placeholder='기본비 집행액' onChange={(e) => setTempExecBasicExpenses(e.target.value)} /><br />
            <input type='text' placeholder='주요사업비 집행액' onChange={(e) => setTempMajorProjectExpenses(e.target.value)} /><br />

            <button onClick={() => {
                setExecutionDetailList([
                    ...executionDetailList,
                    {
                        year: tempYear,
                        execPersonnelExpenses: tempExecPersonnelExpenses,
                        execBasicExpenses: tempExecBasicExpenses,
                        execMajorProjectExpenses: tempMajorProjectExpenses
                    }
                ])
            }}>집행 상세 내역 추가</button>

            <h2>협약서</h2>
            <input type='file' onChange={(e) => setAgreementFile(e.target.files)} />

            <h2>사업수행 계획서</h2>
            <input type='file' onChange={(e) => setBusinessPlanFile(e.target.files)} />

            <br /><br /><br />

            <button onClick={() => {
                post(getDomain() + '/budget/register', {
                    year: year,
                    budgetName: budgetName,
                    budgetAmount: budgetAmount,
                    budgetPersonnelExpenses: budgetPersonnelExpenses,
                    budgetBasicExpenses: budgetBasicExpenses,
                    budgetMajorProjectExpenses: budgetMajorProjectExpenses,
                    executionDetailList: executionDetailList
                })
                .then((response) => {
                    console.log(response.budgetId);

                    let agreementFormData = new FormData();
                    let businessPlanFormData = new FormData();

                    agreementFormData.append('file', agreementFile[0]);
                    agreementFormData.append('budgetId', response.budgetId);

                    businessPlanFormData.append('file', businessPlanFile[0]);
                    businessPlanFormData.append('budgetId', response.budgetId);

                    post_formdata(getDomain() + '/budget/upload', agreementFormData)
                    .then((response) => {
                        console.log("agreementFormData: ", response);
                    })
                    post_formdata(getDomain() + '/budget/upload', businessPlanFormData)
                    .then((response) => {
                        console.log("businessPlanFormData: ", response);
                    })
                })
            }}>예산편성신청</button>
        </div>
    );
}