import { Link } from 'react-router-dom';

export default function Main() {

    return (
        <div>
            <h1>인사</h1>
            <Link to='/career_add'>경력정보등록</Link><br />
            <Link to='/career_show'>경력정보조회</Link>

            <h1>예산</h1>
            <Link to='/budget_add'>예산편성신청</Link><br />
            <Link to='/budget_show'>예산서출력</Link>
        </div>
    );
}