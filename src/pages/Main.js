import axios from "axios";
import { Link } from 'react-router-dom';

import { getDomain } from "../utils/domain";


export default function Main() {

    return (
        <div>
            <h1>인사</h1>
            <Link to='/career_add'>경력정보등록</Link>
            <Link to='/career_show'>경력정보조회</Link>

            <h1>예산</h1>
            <Link to='/budget_add'>예산편성신청</Link>
            <Link to='/budget_show'>예산서출력</Link>
        </div>
    );
}