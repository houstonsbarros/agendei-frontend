import { RingSpinner } from "react-spinners-kit";

const PageSpinner = () => {
    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            <RingSpinner color='#0C2141' />
        </div>
    </>;
};

export default PageSpinner;